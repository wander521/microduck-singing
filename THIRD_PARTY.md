# Sources and licenses

- **MicroDuck geometry** — Pollen Robotics, [microduck_rl](https://github.com/pollen-robotics/microduck_rl) and [MicroDuck](https://github.com/pollen-robotics/microduck). Converted robot geometry `public/assets/robot/microduck.glb` is licensed under **CC BY-NC-SA 4.0**, including material-color adaptations for lilac, graphite, sky and ivory performers. See `public/licenses/LICENSE-MODELS.md`; noncommercial and share-alike restrictions remain. Kinematics descriptions retain their upstream Apache-2.0 license.
- **Rig implementation** — adapted from the Pollen Robotics [microduck-simulator](https://huggingface.co/spaces/pollen-robotics/microduck-simulator), Apache-2.0. Retains existing seated pose and jaw hinge from this workspace.
- **Wistful and Duck Strut** — original Pollen Robotics scores from [MicroDuck revision 53230463927095ea890f231d29089bb0a538c06f](https://github.com/pollen-robotics/microduck/tree/53230463927095ea890f231d29089bb0a538c06f), Apache-2.0. Imported notes, written dynamics, vowels and ties retained; original 58 / 126.000126 BPM. Locked source files and hashes are in `reference/source-lock.json`.
- **Voice and head expressions** — official `sounds/src/chorale`, personality/stream and `robotd/src/chorale.rs` formulae, Apache-2.0, ported to JavaScript/Web Audio. Browser personalities and audio graph are project adaptations; no BLE or hardware implementation is included.
- **Moon Quack March** — original melody from this workspace, arranged as bass, tenor, alto and soprano.
- **Ode to Joy** — public-domain Ludwig van Beethoven melody; new four-part browser arrangement. No commercial recording or modern protected arrangement used.
- **Bungee** — David Jonathan Ross, SIL Open Font License 1.1. `public/assets/fonts/OFL-Bungee.txt`.
- **Three.js / Vite** — MIT, their distributions retain license notices.

The reference YouTube video is linked as inspiration; no downloaded footage or recording is bundled. Outer Wilds test material is not included. The fixed source lock also lists source files studied for the prior music adaptation; it does not claim they are all shipped in this project.

Application code uses Apache-2.0; this does not relicense robot geometry or fonts. See LICENSE and `public/licenses/`.
