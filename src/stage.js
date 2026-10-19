import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { buildRig, cloneRig, applyPose, SITTING_POSE, groundFullBody, setJoint, setJawOpen } from './duck-rig.js';
import { assetUrl } from './assets.js';
import { headExpression } from './music/official-chorale.js';
const SHELLS=['#b19bd5','#444b54','#97c6e3','#eee9db'];
const ACCENTS=['#e0b44b','#b19bd5','#e7ad35','#eead34'];
export async function createStage(container) {
  const scene=new THREE.Scene(); scene.background=new THREE.Color('#afc9c3');
  const renderer=new THREE.WebGLRenderer({antialias:true,alpha:false});
  renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.shadowMap.enabled=true;
  renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.outputColorSpace=THREE.SRGBColorSpace;
  renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1;
  container.append(renderer.domElement);renderer.domElement.setAttribute('aria-label','四只不同配色的 MicroDuck 在木质舞台上围坐合唱，可拖动环绕查看');
  renderer.domElement.setAttribute('role','img');
  const camera=new THREE.PerspectiveCamera(32,1,.01,30);
  const controls=new OrbitControls(camera,renderer.domElement);controls.enableDamping=true;
  controls.enablePan=false;controls.minDistance=1.25;controls.maxDistance=3.5;
  controls.minPolarAngle=.45;controls.maxPolarAngle=1.4;
  let compactView=container.clientWidth<=760;
  function resetView(){
    compactView=container.clientWidth<=760;
    if(compactView){camera.position.set(.45,.77,1.38);controls.target.set(0,.19,0);}
    else{camera.position.set(.378,.597,1.159);controls.target.set(0,.11,0);}
    controls.update();
  }
  resetView();
  scene.add(new THREE.HemisphereLight('#fff4df','#849d96',2));
  const sun=new THREE.DirectionalLight('#fff1d9',2.8);sun.position.set(-1.5,3,2);sun.castShadow=true;
  sun.shadow.mapSize.set(2048,2048);sun.shadow.camera.left=-1.5;sun.shadow.camera.right=1.5;
  sun.shadow.camera.top=1.5;sun.shadow.camera.bottom=-1.5;sun.shadow.normalBias=.004;sun.shadow.bias=-.0001;scene.add(sun);
  const fill=new THREE.DirectionalLight('#dceef5',1.2);fill.position.set(2,1,-2);scene.add(fill);
  const material=(color,roughness=.8)=>new THREE.MeshStandardMaterial({color,roughness});
  function mesh(geometry,mat,x,y,z){const m=new THREE.Mesh(geometry,mat);m.position.set(x,y,z);m.receiveShadow=true;m.castShadow=true;scene.add(m);return m;}
  mesh(new THREE.CylinderGeometry(.79,.76,.09,96),material('#eee6d2'),0,-.071,0);
  mesh(new THREE.CylinderGeometry(.76,.76,.026,96),material('#b58a60'),0,-.014,0);
  // Individual wooden planks, cut to the circular rehearsal floor.
  for(let i=-7;i<=7;i++){
    const z=i*.094,half=Math.sqrt(Math.max(0,.754**2-z*z));
    if(!half)continue;
    mesh(new THREE.BoxGeometry(half*2,.012,.091),material(i%3===0?'#d2b38a':i%3===1?'#d9bd97':'#e0c6a2'),0,.004,z);
  }
  const floor=mesh(new THREE.PlaneGeometry(200,200),new THREE.MeshBasicMaterial({color:'#afc9c3',toneMapped:false}),0,-.122,0);floor.rotation.x=-Math.PI/2;floor.castShadow=false;
  const shadow=mesh(new THREE.PlaneGeometry(200,200),new THREE.ShadowMaterial({opacity:.14}),0,-.1219,0);shadow.rotation.x=-Math.PI/2;shadow.castShadow=false;
  // Two small planters keep the stage in the toy island family.
  for(const [x,z] of [[-.60,-.43],[.58,-.46]]) {
    mesh(new THREE.CylinderGeometry(.065,.047,.09,24),material('#e9dfc6'),x,.05,z);
    mesh(new THREE.CylinderGeometry(.055,.055,.008,24),material('#5a6450'),x,.098,z);
    for(let i=0;i<5;i++){
      const a=i*Math.PI*2/5;
      const leaf=mesh(new THREE.SphereGeometry(.035,10,8),material(i%2?'#5c8263':'#769769'),x+Math.cos(a)*.026,.13+i%2*.035,z+Math.sin(a)*.026);
      leaf.scale.set(.5,1.7,.7);leaf.rotation.z=Math.cos(a)*.4;
    }
  }
  const response=await fetch(assetUrl('assets/robot/kinematics.json'));
  if(!response.ok)throw new Error('机器鸭模型未能加载');
  const k=await response.json();
  const prototype=await buildRig({...k,mesh_dir:assetUrl('assets/robot/meshes')});
  const positions=[[-.46,.12],[-.17,-.08],[.17,-.08],[.46,.12]];
  const rigs=positions.map(([x,z],index)=>{
    const rig=cloneRig(prototype),cache=new Map();
    rig.placer.traverse(o=>{
      if(!o.isMesh)return;
      o.castShadow=true;o.receiveShadow=true;
      const name=o.userData.meshName||'';
      let color;
      if(/lens\.stl/.test(name))color='#101920';
      else if(/noenoeil/.test(name))color=index===0?'#72bcdf':ACCENTS[index];
      else if(/soft_mouth_top|jaw_soft|sole_/.test(name))color=ACCENTS[index];
      else if(/bottom_head_shell|^jaw\.stl|ankle_/.test(name))color=index===2||index===3?'#d96a35':ACCENTS[index];
      else if(/top_head_shell|left_shell|right_shell|trunk_base|upper_leg_|foot_/.test(name))color=SHELLS[index];
      else if(/m12_lens_holder|xl330|yaw2roll|battery|speaker|noen/.test(name))color='#262a2e';
      else if(/neck|leg\.stl|support|bearing/.test(name))color='#60676a';
      if(color){if(!cache.has(color))cache.set(color,new THREE.MeshStandardMaterial({color,roughness:.38,metalness:.06}));o.material=cache.get(color);}
    });
    applyPose(rig,SITTING_POSE);rig.placer.scale.setScalar(1.7);rig.placer.rotation.y=-Math.PI/2+(.15-index*.1);
    rig.placer.position.set(x,0,z);groundFullBody(rig,.012);scene.add(rig.placer);return rig;
  });
  let width=0,height=0;
  function resize(){
    const r=container.getBoundingClientRect();if(r.width===width&&r.height===height)return;
    width=r.width;height=r.height;renderer.setSize(width,height);camera.aspect=width/height;
    if((width<=760)!==compactView)resetView();
    camera.fov=width<=760?48:32;camera.updateProjectionMatrix();
  }
  const observer=new ResizeObserver(resize);observer.observe(container);resize();
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  return {resetView,
    update(frames,beat,playing){
      rigs.forEach((rig,i)=>{
        const f=frames[i],audible=playing&&f.level>0;
        setJawOpen(rig,audible?f.mouth:0);
        const h=headExpression(beat,f.reach||0),strength=audible&&!reduced.matches?1:0;
        setJoint(rig,'neck_pitch',SITTING_POSE.neck_pitch+h[0]*strength);
        setJoint(rig,'head_pitch',SITTING_POSE.head_pitch+h[1]*strength);
        setJoint(rig,'head_yaw',h[2]*strength);setJoint(rig,'head_roll',h[3]*strength);
      });controls.update();renderer.render(scene,camera);
    },
    dispose(){observer.disconnect();controls.dispose();renderer.dispose();},
  };
}
