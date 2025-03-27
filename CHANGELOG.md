## [0.5.0](https://github.com/argocd-diff-action/argocd-diff-action/compare/0.4.3...0.5.0) (2025-03-27)

### Features

* allow custom headers ([#143](https://github.com/argocd-diff-action/argocd-diff-action/issues/143)) ([19115a2](https://github.com/argocd-diff-action/argocd-diff-action/commit/19115a2bf26ae455583f06a715f67d8b7261f3b7))

## [0.4.3](https://github.com/argocd-diff-action/argocd-diff-action/compare/0.4.2...0.4.3) (2025-03-26)

### Bug Fixes

* make timezone an action input ([#141](https://github.com/argocd-diff-action/argocd-diff-action/issues/141)) ([766346c](https://github.com/argocd-diff-action/argocd-diff-action/commit/766346c9337aabdee98a3f23984aeab5ab51d5b7)), closes [#126](https://github.com/argocd-diff-action/argocd-diff-action/issues/126)
* scrub authorization header values from pr comments ([#142](https://github.com/argocd-diff-action/argocd-diff-action/issues/142)) ([29e22c1](https://github.com/argocd-diff-action/argocd-diff-action/commit/29e22c1fcd3177b539de2ccf1cc2283fa6b00333)), closes [#132](https://github.com/argocd-diff-action/argocd-diff-action/issues/132)

## [0.4.2](https://github.com/argocd-diff-action/argocd-diff-action/compare/0.4.1...0.4.2) (2025-03-26)

### Continous Integration

* enable corepack ([fb3b95e](https://github.com/argocd-diff-action/argocd-diff-action/commit/fb3b95eda9f3cc3af170cad7d2ad604b99dd4b80))
* update codeowners ([068dcc0](https://github.com/argocd-diff-action/argocd-diff-action/commit/068dcc09e40d3dd0c572a4c53eea935bd6116028))
* update dependabot rules ([56d490c](https://github.com/argocd-diff-action/argocd-diff-action/commit/56d490c85ce58fca6a3c50ca730f318707a39274))

### Refactors

* switch to pnpm and update dependencies ([934edca](https://github.com/argocd-diff-action/argocd-diff-action/commit/934edcaa34cac8d64106a5337d923b92356cbefb))
* update linting and fix tests ([e96acf6](https://github.com/argocd-diff-action/argocd-diff-action/commit/e96acf6b1d5c6b35fb5b84bbb4ccecfd390ab0c4))

### Tests

* missing dependency ([f55d113](https://github.com/argocd-diff-action/argocd-diff-action/commit/f55d1136bb0cf9982d8755bf3671c30a6970e14e))

## [0.4.1](https://github.com/argocd-diff-action/argocd-diff-action/compare/0.4.0...0.4.1) (2025-02-24)

### Bug Fixes

* invert logic when adding plaintext cli arg ([11c98ea](https://github.com/argocd-diff-action/argocd-diff-action/commit/11c98ea0a0f213f209acb1db1f7a7e79e1d861a7))

## [0.4.0](https://github.com/argocd-diff-action/argocd-diff-action/compare/0.3.1...0.4.0) (2024-12-22)

### Continous Integration

* **stale:** add workflow dispatch ([cbdfaa1](https://github.com/argocd-diff-action/argocd-diff-action/commit/cbdfaa174f477f60113e99665b69621c7312b883))
* **stale:** add write permission for issues and prs ([d38cdda](https://github.com/argocd-diff-action/argocd-diff-action/commit/d38cddacf9976ad35e5ed1e0282b19d96d9c1798))

### Features

* support plaintext protocol ([#81](https://github.com/argocd-diff-action/argocd-diff-action/issues/81)) ([e3737b4](https://github.com/argocd-diff-action/argocd-diff-action/commit/e3737b43347360942f816056f1995136ce4b6e2e)), closes [#73](https://github.com/argocd-diff-action/argocd-diff-action/issues/73)

## [0.3.1](https://github.com/argocd-diff-action/argocd-diff-action/compare/0.3.0...0.3.1) (2024-12-20)

### Continous Integration

* **lint-pr:** run on pull_request ([19472ec](https://github.com/argocd-diff-action/argocd-diff-action/commit/19472ec662a00b4acb5c5d6d84141b7b96e59cfc))

### Refactors

* remove node-fetch package ([1cb77b5](https://github.com/argocd-diff-action/argocd-diff-action/commit/1cb77b50742c2f8e58cd87543977d7c49ab18e74))

## [0.3.0](https://github.com/argocd-diff-action/argocd-diff-action/compare/0.2.0...0.3.0) (2024-12-20)

### Continous Integration

* use a different action to lint pr titles ([1f6c16f](https://github.com/argocd-diff-action/argocd-diff-action/commit/1f6c16f8f3290cf2d988ef65e7286d59169fe3fb))

### Features

* make source optional and use native fetch ([#80](https://github.com/argocd-diff-action/argocd-diff-action/issues/80)) ([82e59fb](https://github.com/argocd-diff-action/argocd-diff-action/commit/82e59fb3ce11e106800f3a4a453fffb338a23ddc)), closes [#4](https://github.com/argocd-diff-action/argocd-diff-action/issues/4)

## [0.2.0](https://github.com/argocd-diff-action/argocd-diff-action/compare/0.1.14...0.2.0) (2024-12-20)

### Continous Integration

* update all ci actions ([#78](https://github.com/argocd-diff-action/argocd-diff-action/issues/78)) ([f586784](https://github.com/argocd-diff-action/argocd-diff-action/commit/f586784297f0d10d3d34d5181b1baa3354ec1ce4))

### Features

* use node 20 ([#79](https://github.com/argocd-diff-action/argocd-diff-action/issues/79)) ([75e29bc](https://github.com/argocd-diff-action/argocd-diff-action/commit/75e29bc50f5d5ae8a94c488a6e2ad6bb565eeb62)), closes [#74](https://github.com/argocd-diff-action/argocd-diff-action/issues/74)

## [0.1.14](https://github.com/argocd-diff-action/argocd-diff-action/compare/0.1.13...0.1.14) (2024-12-20)

### Build & Dependencies

* **deps-dev:** bump @semantic-release/github from 8.0.7 to 8.1.0 ([#50](https://github.com/argocd-diff-action/argocd-diff-action/issues/50)) ([4fa3e1e](https://github.com/argocd-diff-action/argocd-diff-action/commit/4fa3e1e07c21c6288a134bf22dd281b2528c7b75))
* **deps-dev:** bump @types/sinon from 10.0.13 to 10.0.14 ([#40](https://github.com/argocd-diff-action/argocd-diff-action/issues/40)) ([8a3a2bc](https://github.com/argocd-diff-action/argocd-diff-action/commit/8a3a2bc22fa65689838b31dd0581f76984c5a2f4))
* **deps-dev:** bump @types/sinon from 10.0.14 to 10.0.15 ([#47](https://github.com/argocd-diff-action/argocd-diff-action/issues/47)) ([f78542e](https://github.com/argocd-diff-action/argocd-diff-action/commit/f78542e1012a967bbdef394ec72348222d654256))
* **deps-dev:** bump eslint from 8.38.0 to 8.39.0 ([#42](https://github.com/argocd-diff-action/argocd-diff-action/issues/42)) ([3f21a41](https://github.com/argocd-diff-action/argocd-diff-action/commit/3f21a412d8355ce85283b78f19b2d371cf7693d1))
* **deps-dev:** bump eslint from 8.39.0 to 8.40.0 ([#46](https://github.com/argocd-diff-action/argocd-diff-action/issues/46)) ([f48455e](https://github.com/argocd-diff-action/argocd-diff-action/commit/f48455e0b644ce27ff84d56ed9165d34f33cf280))
* **deps-dev:** bump eslint from 8.40.0 to 8.41.0 ([#49](https://github.com/argocd-diff-action/argocd-diff-action/issues/49)) ([1fcea79](https://github.com/argocd-diff-action/argocd-diff-action/commit/1fcea798e6b594980b9d479981609235db7e83c9))
* **deps-dev:** bump eslint from 8.41.0 to 8.42.0 ([#55](https://github.com/argocd-diff-action/argocd-diff-action/issues/55)) ([e228ceb](https://github.com/argocd-diff-action/argocd-diff-action/commit/e228ceb84a76422bae2e428ec7bbcc60fbc7d879))
* **deps-dev:** bump eslint-plugin-github from 4.7.0 to 4.8.0 ([#53](https://github.com/argocd-diff-action/argocd-diff-action/issues/53)) ([7195859](https://github.com/argocd-diff-action/argocd-diff-action/commit/71958591482f1e0838855872d311f46471f8f308))
* **deps-dev:** bump prettier from 2.8.7 to 2.8.8 ([#43](https://github.com/argocd-diff-action/argocd-diff-action/issues/43)) ([77acce8](https://github.com/argocd-diff-action/argocd-diff-action/commit/77acce8c5ff35367f82f9f4c2fe9828280bcd4e8))
* **deps-dev:** bump semantic-release from 21.0.1 to 21.0.2 ([#44](https://github.com/argocd-diff-action/argocd-diff-action/issues/44)) ([f8246f7](https://github.com/argocd-diff-action/argocd-diff-action/commit/f8246f7e5da7dbab70283b900cdfa0062a097191))
* **deps-dev:** bump sinon from 15.0.3 to 15.0.4 ([#41](https://github.com/argocd-diff-action/argocd-diff-action/issues/41)) ([d530c96](https://github.com/argocd-diff-action/argocd-diff-action/commit/d530c9692cd06e2b1ea268a58fb739b44d295a69))
* **deps-dev:** bump sinon from 15.0.4 to 15.1.0 ([#48](https://github.com/argocd-diff-action/argocd-diff-action/issues/48)) ([9fd961b](https://github.com/argocd-diff-action/argocd-diff-action/commit/9fd961bbbef8a59327cbe0fe9949a2819d6da457))
* **deps-dev:** bump sinon from 15.1.0 to 15.1.2 ([#58](https://github.com/argocd-diff-action/argocd-diff-action/issues/58)) ([82e52b5](https://github.com/argocd-diff-action/argocd-diff-action/commit/82e52b5ce64980e5cf84f5e24544840f738f1708))
* **deps-dev:** bump typescript from 5.0.4 to 5.1.3 ([#52](https://github.com/argocd-diff-action/argocd-diff-action/issues/52)) ([5030c33](https://github.com/argocd-diff-action/argocd-diff-action/commit/5030c33b1af5b17c321dc2f335f47552fcd04481))

### Continous Integration

* **release:** no release for deps-dev ([#34](https://github.com/argocd-diff-action/argocd-diff-action/issues/34)) ([db0acdf](https://github.com/argocd-diff-action/argocd-diff-action/commit/db0acdf3a2116abce30dc56019a6ea6f097b9839))
* update release action versions ([#77](https://github.com/argocd-diff-action/argocd-diff-action/issues/77)) ([3e9fedc](https://github.com/argocd-diff-action/argocd-diff-action/commit/3e9fedc571ea727a83830816478b00dd8318c750))
* upgrade semantic release packages ([3182a5d](https://github.com/argocd-diff-action/argocd-diff-action/commit/3182a5db69d909adbfdf15fd663b45075dfcd639))
* use action permissions to push tags ([dd2ae09](https://github.com/argocd-diff-action/argocd-diff-action/commit/dd2ae09933210c8990755a00f16b2b71b225911c))
* use github workflow token ([a89f300](https://github.com/argocd-diff-action/argocd-diff-action/commit/a89f30024326504b778fa7bc85645f5aa4a31946))
* use new app to commit releases ([a1fafbb](https://github.com/argocd-diff-action/argocd-diff-action/commit/a1fafbb987a693de2874ffd913024fceb1256bf8))

### Bug Fixes

* warn and exit on no apps ([#30](https://github.com/argocd-diff-action/argocd-diff-action/issues/30)) ([3d5fee5](https://github.com/argocd-diff-action/argocd-diff-action/commit/3d5fee575618e135a6d5045e04b6774650dacb74)), closes [#29](https://github.com/argocd-diff-action/argocd-diff-action/issues/29)

## [0.1.13](https://github.com/argocd-diff-action/argocd-diff-action/compare/0.1.12...0.1.13) (2023-04-10)


### Build & Dependencies

* **deps-dev:** bump typescript from 5.0.3 to 5.0.4 ([#39](https://github.com/argocd-diff-action/argocd-diff-action/issues/39)) ([08ebed6](https://github.com/argocd-diff-action/argocd-diff-action/commit/08ebed659f154962a853ed9ac025fa3a12ade65f))

## [0.1.12](https://github.com/argocd-diff-action/argocd-diff-action/compare/0.1.11...0.1.12) (2023-04-10)


### Build & Dependencies

* **deps-dev:** bump eslint from 8.37.0 to 8.38.0 ([#38](https://github.com/argocd-diff-action/argocd-diff-action/issues/38)) ([5f1c828](https://github.com/argocd-diff-action/argocd-diff-action/commit/5f1c82893512a833dc30e230635b58096e292ba7))

## [0.1.11](https://github.com/argocd-diff-action/argocd-diff-action/compare/0.1.10...0.1.11) (2023-04-03)


### Build & Dependencies

* **deps-dev:** bump semantic-release from 21.0.0 to 21.0.1 ([#37](https://github.com/argocd-diff-action/argocd-diff-action/issues/37)) ([f3c0265](https://github.com/argocd-diff-action/argocd-diff-action/commit/f3c02651ef5effecd2974e4c11aad091f8eb4937))

## [0.1.10](https://github.com/argocd-diff-action/argocd-diff-action/compare/0.1.9...0.1.10) (2023-03-31)


### Build & Dependencies

* **deps-dev:** bump typescript from 5.0.2 to 5.0.3 ([#36](https://github.com/argocd-diff-action/argocd-diff-action/issues/36)) ([faa3a0e](https://github.com/argocd-diff-action/argocd-diff-action/commit/faa3a0e14653f1ae22f27f26dbaed49a33d78450))

## [0.1.9](https://github.com/argocd-diff-action/argocd-diff-action/compare/0.1.8...0.1.9) (2023-03-29)


### Build & Dependencies

* **deps-dev:** bump eslint from 8.36.0 to 8.37.0 ([#35](https://github.com/argocd-diff-action/argocd-diff-action/issues/35)) ([b730b72](https://github.com/argocd-diff-action/argocd-diff-action/commit/b730b72190b73ba09210e5cead848c1c1f504719))

## [0.1.8](https://github.com/argocd-diff-action/argocd-diff-action/compare/0.1.7...0.1.8) (2023-03-27)


### Build & Dependencies

* **deps-dev:** bump semantic-release from 20.1.3 to 21.0.0 ([#32](https://github.com/argocd-diff-action/argocd-diff-action/issues/32)) ([b958c2a](https://github.com/argocd-diff-action/argocd-diff-action/commit/b958c2aa573ead277ccb2bc3533b8e5aa3e3b54a))

## [0.1.7](https://github.com/argocd-diff-action/argocd-diff-action/compare/0.1.6...0.1.7) (2023-03-27)


### Build & Dependencies

* **deps-dev:** bump sinon from 15.0.2 to 15.0.3 ([#33](https://github.com/argocd-diff-action/argocd-diff-action/issues/33)) ([94163ad](https://github.com/argocd-diff-action/argocd-diff-action/commit/94163ade07296390a065fe6b2372bf3cccadbb97))

## [0.1.6](https://github.com/argocd-diff-action/argocd-diff-action/compare/0.1.5...0.1.6) (2023-03-27)


### Build & Dependencies

* **deps-dev:** bump prettier from 2.8.6 to 2.8.7 ([#31](https://github.com/argocd-diff-action/argocd-diff-action/issues/31)) ([2012e00](https://github.com/argocd-diff-action/argocd-diff-action/commit/2012e008be22bf1cd8fb5ed4d5736a75d4dcb1a0))

## [0.1.5](https://github.com/argocd-diff-action/argocd-diff-action/compare/0.1.4...0.1.5) (2023-03-24)


### Build & Dependencies

* **deps-dev:** bump @semantic-release/changelog from 6.0.2 to 6.0.3 ([#28](https://github.com/argocd-diff-action/argocd-diff-action/issues/28)) ([dd4ac44](https://github.com/argocd-diff-action/argocd-diff-action/commit/dd4ac4461edd83b49ac113e04c8b0245c7022632))
* **deps-dev:** bump eslint-plugin-github from 4.6.1 to 4.7.0 ([#27](https://github.com/argocd-diff-action/argocd-diff-action/issues/27)) ([2bda757](https://github.com/argocd-diff-action/argocd-diff-action/commit/2bda75773f587d0bd0fdc74fb52a0c21062e1318))

## [0.1.4](https://github.com/argocd-diff-action/argocd-diff-action/compare/0.1.3...0.1.4) (2023-03-22)


### Build & Dependencies

* **deps-dev:** bump prettier from 2.8.5 to 2.8.6 ([#26](https://github.com/argocd-diff-action/argocd-diff-action/issues/26)) ([5b48846](https://github.com/argocd-diff-action/argocd-diff-action/commit/5b488463d1e7a658e1db1c74fddf65717148d58a))

## [0.1.3](https://github.com/argocd-diff-action/argocd-diff-action/compare/0.1.2...0.1.3) (2023-03-21)


### Build & Dependencies

* **deps-dev:** bump prettier from 2.8.4 to 2.8.5 ([#24](https://github.com/argocd-diff-action/argocd-diff-action/issues/24)) ([e8eb08c](https://github.com/argocd-diff-action/argocd-diff-action/commit/e8eb08cfa269700259c5afa4ff19037adad2d10a))

## [0.1.2](https://github.com/argocd-diff-action/argocd-diff-action/compare/0.1.1...0.1.2) (2023-03-21)


### Documentation

* **readme:** update local dev section ([#21](https://github.com/argocd-diff-action/argocd-diff-action/issues/21)) ([5341576](https://github.com/argocd-diff-action/argocd-diff-action/commit/53415764e7f086faefbc5e6183083e32ca2d8c9e))


### Build & Dependencies

* **deps-dev:** bump semantic-release from 20.1.1 to 20.1.3 ([#25](https://github.com/argocd-diff-action/argocd-diff-action/issues/25)) ([deb7987](https://github.com/argocd-diff-action/argocd-diff-action/commit/deb7987f6ecdfab2b76ebb318198d842dc6055c4))

## [0.1.1](https://github.com/argocd-diff-action/argocd-diff-action/compare/0.1.0...0.1.1) (2023-03-20)


### Continous Integration

* **auto-merge:** use new bot token ([#16](https://github.com/argocd-diff-action/argocd-diff-action/issues/16)) ([10d01df](https://github.com/argocd-diff-action/argocd-diff-action/commit/10d01dfa5acf4ac24eec4d924017cf005750d99e))
* **labler:** use new bot token ([#14](https://github.com/argocd-diff-action/argocd-diff-action/issues/14)) ([760c0e5](https://github.com/argocd-diff-action/argocd-diff-action/commit/760c0e5d35486f840a178d9b14ace2ffeb2faff2))
* **release:** fix repo url ([#17](https://github.com/argocd-diff-action/argocd-diff-action/issues/17)) ([786be91](https://github.com/argocd-diff-action/argocd-diff-action/commit/786be91d3f8d453164492e2e25be32ebf78cca0e))
* **release:** update to new repo ([#11](https://github.com/argocd-diff-action/argocd-diff-action/issues/11)) ([3603151](https://github.com/argocd-diff-action/argocd-diff-action/commit/3603151c84a3637a68fc4337e3597077afbbb0b7)), closes [#5](https://github.com/argocd-diff-action/argocd-diff-action/issues/5) [/github.com/semantic-release/semantic-release/issues/1587#issuecomment-722769804](https://github.com/argocd-diff-action//github.com/semantic-release/semantic-release/issues/1587/issues/issuecomment-722769804)


### Build & Dependencies

* **deps-dev:** bump eslint from 8.35.0 to 8.36.0 ([#7](https://github.com/argocd-diff-action/argocd-diff-action/issues/7)) ([40f7372](https://github.com/argocd-diff-action/argocd-diff-action/commit/40f7372d6ef603ed9dee496ba334114c2d55397e))
* **deps-dev:** bump jest-circus from 29.4.3 to 29.5.0 ([#6](https://github.com/argocd-diff-action/argocd-diff-action/issues/6)) ([04a3df0](https://github.com/argocd-diff-action/argocd-diff-action/commit/04a3df0ffe08a2162f618762cac66c8f6046a9f0))
* **deps-dev:** bump sinon from 15.0.1 to 15.0.2 ([#9](https://github.com/argocd-diff-action/argocd-diff-action/issues/9)) ([a5c5ebb](https://github.com/argocd-diff-action/argocd-diff-action/commit/a5c5ebba0d5ff784ba637660da0aeef2a577ff3f))
* **deps-dev:** bump typescript from 4.9.5 to 5.0.2 ([#10](https://github.com/argocd-diff-action/argocd-diff-action/issues/10)) ([58a1296](https://github.com/argocd-diff-action/argocd-diff-action/commit/58a1296df44fb5edcb24771fbe09c913927f9fe5))

## [0.1.0](https://github.com/argocd-diff-action/argocd-diff-action/tree/0.1.0) (2023-03-03)
