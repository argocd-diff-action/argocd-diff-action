## [0.6.3](https://github.com/argocd-diff-action/argocd-diff-action/compare/0.6.2...0.6.3) (2025-08-19)

### Bug Fixes

* respect argocd-server-tls flag when making fetch calls ([#173](https://github.com/argocd-diff-action/argocd-diff-action/issues/173)) ([9e98125](https://github.com/argocd-diff-action/argocd-diff-action/commit/9e981252c92c753d5846d2b90434d6a43e4bd278)), closes [#149](https://github.com/argocd-diff-action/argocd-diff-action/issues/149)

## [0.6.2](https://github.com/argocd-diff-action/argocd-diff-action/compare/0.6.1...0.6.2) (2025-08-19)

### Bug Fixes

* allow headers to be an empty string ([#172](https://github.com/argocd-diff-action/argocd-diff-action/issues/172)) ([8b5702c](https://github.com/argocd-diff-action/argocd-diff-action/commit/8b5702c12c476d745ab56619c780d330bc8ab2d0)), closes [#166](https://github.com/argocd-diff-action/argocd-diff-action/issues/166)

## [0.6.1](https://github.com/argocd-diff-action/argocd-diff-action/compare/0.6.0...0.6.1) (2025-08-19)

### Build & Dependencies

* approve unrs-resolver ([a4d90c3](https://github.com/argocd-diff-action/argocd-diff-action/commit/a4d90c39b3461aca85ea0e3a93796bb9f1f7482e))
* **deps-dev:** bump the npm-development group with 7 updates ([#167](https://github.com/argocd-diff-action/argocd-diff-action/issues/167)) ([41478c9](https://github.com/argocd-diff-action/argocd-diff-action/commit/41478c9bfb017635ffffa4e1794738229aac8f83)), closes [#19939](https://github.com/argocd-diff-action/argocd-diff-action/issues/19939) [#19941](https://github.com/argocd-diff-action/argocd-diff-action/issues/19941) [#19995](https://github.com/argocd-diff-action/argocd-diff-action/issues/19995) [#19975](https://github.com/argocd-diff-action/argocd-diff-action/issues/19975) [#19671](https://github.com/argocd-diff-action/argocd-diff-action/issues/19671) [#19979](https://github.com/argocd-diff-action/argocd-diff-action/issues/19979) [#19980](https://github.com/argocd-diff-action/argocd-diff-action/issues/19980) [#19974](https://github.com/argocd-diff-action/argocd-diff-action/issues/19974) [#19972](https://github.com/argocd-diff-action/argocd-diff-action/issues/19972) [#19998](https://github.com/argocd-diff-action/argocd-diff-action/issues/19998) [#19993](https://github.com/argocd-diff-action/argocd-diff-action/issues/19993) [#19977](https://github.com/argocd-diff-action/argocd-diff-action/issues/19977) [#19998](https://github.com/argocd-diff-action/argocd-diff-action/issues/19998) [#19993](https://github.com/argocd-diff-action/argocd-diff-action/issues/19993) [#19995](https://github.com/argocd-diff-action/argocd-diff-action/issues/19995) [#19671](https://github.com/argocd-diff-action/argocd-diff-action/issues/19671) [#19979](https://github.com/argocd-diff-action/argocd-diff-action/issues/19979) [#19980](https://github.com/argocd-diff-action/argocd-diff-action/issues/19980) [#19939](https://github.com/argocd-diff-action/argocd-diff-action/issues/19939) [#19974](https://github.com/argocd-diff-action/argocd-diff-action/issues/19974) [#19977](https://github.com/argocd-diff-action/argocd-diff-action/issues/19977) [#19975](https://github.com/argocd-diff-action/argocd-diff-action/issues/19975) [#19941](https://github.com/argocd-diff-action/argocd-diff-action/issues/19941) [#19972](https://github.com/argocd-diff-action/argocd-diff-action/issues/19972) [eslint-stylistic/eslint-stylistic#910](https://github.com/eslint-stylistic/eslint-stylistic/issues/910) [eslint-stylistic/eslint-stylistic#919](https://github.com/eslint-stylistic/eslint-stylistic/issues/919) [#910](https://github.com/argocd-diff-action/argocd-diff-action/issues/910) [#919](https://github.com/argocd-diff-action/argocd-diff-action/issues/919) [#911](https://github.com/argocd-diff-action/argocd-diff-action/issues/911) [#919](https://github.com/argocd-diff-action/argocd-diff-action/issues/919) [#19939](https://github.com/argocd-diff-action/argocd-diff-action/issues/19939) [#19941](https://github.com/argocd-diff-action/argocd-diff-action/issues/19941) [#19995](https://github.com/argocd-diff-action/argocd-diff-action/issues/19995) [#19975](https://github.com/argocd-diff-action/argocd-diff-action/issues/19975) [#19671](https://github.com/argocd-diff-action/argocd-diff-action/issues/19671) [#19979](https://github.com/argocd-diff-action/argocd-diff-action/issues/19979) [#19980](https://github.com/argocd-diff-action/argocd-diff-action/issues/19980) [#19974](https://github.com/argocd-diff-action/argocd-diff-action/issues/19974) [#19972](https://github.com/argocd-diff-action/argocd-diff-action/issues/19972) [#19998](https://github.com/argocd-diff-action/argocd-diff-action/issues/19998) [#19993](https://github.com/argocd-diff-action/argocd-diff-action/issues/19993) [#19977](https://github.com/argocd-diff-action/argocd-diff-action/issues/19977) [#19998](https://github.com/argocd-diff-action/argocd-diff-action/issues/19998) [#19993](https://github.com/argocd-diff-action/argocd-diff-action/issues/19993) [#19995](https://github.com/argocd-diff-action/argocd-diff-action/issues/19995) [#19671](https://github.com/argocd-diff-action/argocd-diff-action/issues/19671) [#19979](https://github.com/argocd-diff-action/argocd-diff-action/issues/19979) [#19980](https://github.com/argocd-diff-action/argocd-diff-action/issues/19980) [#19939](https://github.com/argocd-diff-action/argocd-diff-action/issues/19939) [#19974](https://github.com/argocd-diff-action/argocd-diff-action/issues/19974) [#19977](https://github.com/argocd-diff-action/argocd-diff-action/issues/19977) [#19975](https://github.com/argocd-diff-action/argocd-diff-action/issues/19975) [#19941](https://github.com/argocd-diff-action/argocd-diff-action/issues/19941) [#19972](https://github.com/argocd-diff-action/argocd-diff-action/issues/19972) [#19998](https://github.com/argocd-diff-action/argocd-diff-action/issues/19998) [#19993](https://github.com/argocd-diff-action/argocd-diff-action/issues/19993) [#19995](https://github.com/argocd-diff-action/argocd-diff-action/issues/19995) [#19671](https://github.com/argocd-diff-action/argocd-diff-action/issues/19671) [#19979](https://github.com/argocd-diff-action/argocd-diff-action/issues/19979) [#19980](https://github.com/argocd-diff-action/argocd-diff-action/issues/19980) [#4969](https://github.com/argocd-diff-action/argocd-diff-action/issues/4969) [#62113](https://github.com/argocd-diff-action/argocd-diff-action/issues/62113) [#62037](https://github.com/argocd-diff-action/argocd-diff-action/issues/62037) [#62086](https://github.com/argocd-diff-action/argocd-diff-action/issues/62086) [#62016](https://github.com/argocd-diff-action/argocd-diff-action/issues/62016) [#61221](https://github.com/argocd-diff-action/argocd-diff-action/issues/61221) [#61945](https://github.com/argocd-diff-action/argocd-diff-action/issues/61945) [#11445](https://github.com/argocd-diff-action/argocd-diff-action/issues/11445) [#11127](https://github.com/argocd-diff-action/argocd-diff-action/issues/11127) [#11427](https://github.com/argocd-diff-action/argocd-diff-action/issues/11427) [#11417](https://github.com/argocd-diff-action/argocd-diff-action/issues/11417) [#11272](https://github.com/argocd-diff-action/argocd-diff-action/issues/11272) [#11403](https://github.com/argocd-diff-action/argocd-diff-action/issues/11403) [#11445](https://github.com/argocd-diff-action/argocd-diff-action/issues/11445) [#11445](https://github.com/argocd-diff-action/argocd-diff-action/issues/11445)

### Continous Integration

* remove stale workflow for now ([e1dfc5e](https://github.com/argocd-diff-action/argocd-diff-action/commit/e1dfc5e2d165f9118cf41ccec5bd2bfa5eddbc3a))

## [0.6.0](https://github.com/argocd-diff-action/argocd-diff-action/compare/0.5.4...0.6.0) (2025-08-19)

### Features

* allow users to specify targetRevisions ([#171](https://github.com/argocd-diff-action/argocd-diff-action/issues/171)) ([9cebb3f](https://github.com/argocd-diff-action/argocd-diff-action/commit/9cebb3f5622bf846da2aebc5c7a547dcc081ee9a)), closes [#168](https://github.com/argocd-diff-action/argocd-diff-action/issues/168)

## [0.5.4](https://github.com/argocd-diff-action/argocd-diff-action/compare/0.5.3...0.5.4) (2025-08-19)

### Build & Dependencies

* **deps-dev:** bump @stylistic/eslint-plugin from 4.2.0 to 5.2.2 ([#163](https://github.com/argocd-diff-action/argocd-diff-action/issues/163)) ([3ae28b0](https://github.com/argocd-diff-action/argocd-diff-action/commit/3ae28b0200386b3ccc8e653641b75c89a27e2f96)), closes [eslint-stylistic/eslint-stylistic#905](https://github.com/eslint-stylistic/eslint-stylistic/issues/905) [eslint-stylistic/eslint-stylistic#907](https://github.com/eslint-stylistic/eslint-stylistic/issues/907) [eslint-stylistic/eslint-stylistic#887](https://github.com/eslint-stylistic/eslint-stylistic/issues/887) [eslint-stylistic/eslint-stylistic#903](https://github.com/eslint-stylistic/eslint-stylistic/issues/903) [eslint-stylistic/eslint-stylistic#886](https://github.com/eslint-stylistic/eslint-stylistic/issues/886) [eslint-stylistic/eslint-stylistic#829](https://github.com/eslint-stylistic/eslint-stylistic/issues/829) [eslint-stylistic/eslint-stylistic#867](https://github.com/eslint-stylistic/eslint-stylistic/issues/867) [eslint-stylistic/eslint-stylistic#796](https://github.com/eslint-stylistic/eslint-stylistic/issues/796) [eslint-stylistic/eslint-stylistic#884](https://github.com/eslint-stylistic/eslint-stylistic/issues/884) [eslint-stylistic/eslint-stylistic#863](https://github.com/eslint-stylistic/eslint-stylistic/issues/863) [eslint-stylistic/eslint-stylistic#876](https://github.com/eslint-stylistic/eslint-stylistic/issues/876) [eslint-stylistic/eslint-stylistic#873](https://github.com/eslint-stylistic/eslint-stylistic/issues/873) [eslint-stylistic/eslint-stylistic#862](https://github.com/eslint-stylistic/eslint-stylistic/issues/862) [eslint-stylistic/eslint-stylistic#883](https://github.com/eslint-stylistic/eslint-stylistic/issues/883) [eslint-stylistic/eslint-stylistic#861](https://github.com/eslint-stylistic/eslint-stylistic/issues/861) [#905](https://github.com/argocd-diff-action/argocd-diff-action/issues/905) [#907](https://github.com/argocd-diff-action/argocd-diff-action/issues/907) [#900](https://github.com/argocd-diff-action/argocd-diff-action/issues/900) [#903](https://github.com/argocd-diff-action/argocd-diff-action/issues/903) [#887](https://github.com/argocd-diff-action/argocd-diff-action/issues/887) [#897](https://github.com/argocd-diff-action/argocd-diff-action/issues/897) [#891](https://github.com/argocd-diff-action/argocd-diff-action/issues/891) [#886](https://github.com/argocd-diff-action/argocd-diff-action/issues/886) [#867](https://github.com/argocd-diff-action/argocd-diff-action/issues/867) [#884](https://github.com/argocd-diff-action/argocd-diff-action/issues/884) [#796](https://github.com/argocd-diff-action/argocd-diff-action/issues/796) [#863](https://github.com/argocd-diff-action/argocd-diff-action/issues/863) [#876](https://github.com/argocd-diff-action/argocd-diff-action/issues/876) [#873](https://github.com/argocd-diff-action/argocd-diff-action/issues/873) [#862](https://github.com/argocd-diff-action/argocd-diff-action/issues/862) [#829](https://github.com/argocd-diff-action/argocd-diff-action/issues/829) [#883](https://github.com/argocd-diff-action/argocd-diff-action/issues/883) [#908](https://github.com/argocd-diff-action/argocd-diff-action/issues/908) [#900](https://github.com/argocd-diff-action/argocd-diff-action/issues/900) [#888](https://github.com/argocd-diff-action/argocd-diff-action/issues/888) [#903](https://github.com/argocd-diff-action/argocd-diff-action/issues/903) [#897](https://github.com/argocd-diff-action/argocd-diff-action/issues/897) [#891](https://github.com/argocd-diff-action/argocd-diff-action/issues/891) [#887](https://github.com/argocd-diff-action/argocd-diff-action/issues/887) [#886](https://github.com/argocd-diff-action/argocd-diff-action/issues/886)
* **deps-dev:** bump the npm-development group with 6 updates ([#162](https://github.com/argocd-diff-action/argocd-diff-action/issues/162)) ([08d72b5](https://github.com/argocd-diff-action/argocd-diff-action/commit/08d72b554d0925a8ce8e5737a2a05350e2613101)), closes [#19828](https://github.com/argocd-diff-action/argocd-diff-action/issues/19828) [#19882](https://github.com/argocd-diff-action/argocd-diff-action/issues/19882) [#19971](https://github.com/argocd-diff-action/argocd-diff-action/issues/19971) [#19877](https://github.com/argocd-diff-action/argocd-diff-action/issues/19877) [#19965](https://github.com/argocd-diff-action/argocd-diff-action/issues/19965) [#19932](https://github.com/argocd-diff-action/argocd-diff-action/issues/19932) [#19944](https://github.com/argocd-diff-action/argocd-diff-action/issues/19944) [#19937](https://github.com/argocd-diff-action/argocd-diff-action/issues/19937) [#19970](https://github.com/argocd-diff-action/argocd-diff-action/issues/19970) [#19964](https://github.com/argocd-diff-action/argocd-diff-action/issues/19964) [#19953](https://github.com/argocd-diff-action/argocd-diff-action/issues/19953) [#19960](https://github.com/argocd-diff-action/argocd-diff-action/issues/19960) [#19949](https://github.com/argocd-diff-action/argocd-diff-action/issues/19949) [#19919](https://github.com/argocd-diff-action/argocd-diff-action/issues/19919) [#19948](https://github.com/argocd-diff-action/argocd-diff-action/issues/19948) [#19943](https://github.com/argocd-diff-action/argocd-diff-action/issues/19943) [#19971](https://github.com/argocd-diff-action/argocd-diff-action/issues/19971) [#19877](https://github.com/argocd-diff-action/argocd-diff-action/issues/19877) [#19970](https://github.com/argocd-diff-action/argocd-diff-action/issues/19970) [#19965](https://github.com/argocd-diff-action/argocd-diff-action/issues/19965) [#19964](https://github.com/argocd-diff-action/argocd-diff-action/issues/19964) [#19953](https://github.com/argocd-diff-action/argocd-diff-action/issues/19953) [#19960](https://github.com/argocd-diff-action/argocd-diff-action/issues/19960) [#19932](https://github.com/argocd-diff-action/argocd-diff-action/issues/19932) [#19949](https://github.com/argocd-diff-action/argocd-diff-action/issues/19949) [#19828](https://github.com/argocd-diff-action/argocd-diff-action/issues/19828) [#19919](https://github.com/argocd-diff-action/argocd-diff-action/issues/19919) [#19882](https://github.com/argocd-diff-action/argocd-diff-action/issues/19882) [#19948](https://github.com/argocd-diff-action/argocd-diff-action/issues/19948) [#19944](https://github.com/argocd-diff-action/argocd-diff-action/issues/19944) [#19943](https://github.com/argocd-diff-action/argocd-diff-action/issues/19943) [#19937](https://github.com/argocd-diff-action/argocd-diff-action/issues/19937) [#15702](https://github.com/argocd-diff-action/argocd-diff-action/issues/15702) [#19828](https://github.com/argocd-diff-action/argocd-diff-action/issues/19828) [#19882](https://github.com/argocd-diff-action/argocd-diff-action/issues/19882) [#19971](https://github.com/argocd-diff-action/argocd-diff-action/issues/19971) [#19877](https://github.com/argocd-diff-action/argocd-diff-action/issues/19877) [#19965](https://github.com/argocd-diff-action/argocd-diff-action/issues/19965) [#19932](https://github.com/argocd-diff-action/argocd-diff-action/issues/19932) [#19944](https://github.com/argocd-diff-action/argocd-diff-action/issues/19944) [#19937](https://github.com/argocd-diff-action/argocd-diff-action/issues/19937) [#19970](https://github.com/argocd-diff-action/argocd-diff-action/issues/19970) [#19964](https://github.com/argocd-diff-action/argocd-diff-action/issues/19964) [#19953](https://github.com/argocd-diff-action/argocd-diff-action/issues/19953) [#19960](https://github.com/argocd-diff-action/argocd-diff-action/issues/19960) [#19949](https://github.com/argocd-diff-action/argocd-diff-action/issues/19949) [#19919](https://github.com/argocd-diff-action/argocd-diff-action/issues/19919) [#19948](https://github.com/argocd-diff-action/argocd-diff-action/issues/19948) [#19943](https://github.com/argocd-diff-action/argocd-diff-action/issues/19943) [#19971](https://github.com/argocd-diff-action/argocd-diff-action/issues/19971) [#19877](https://github.com/argocd-diff-action/argocd-diff-action/issues/19877) [#19970](https://github.com/argocd-diff-action/argocd-diff-action/issues/19970) [#19965](https://github.com/argocd-diff-action/argocd-diff-action/issues/19965) [#19964](https://github.com/argocd-diff-action/argocd-diff-action/issues/19964) [#19953](https://github.com/argocd-diff-action/argocd-diff-action/issues/19953) [#19960](https://github.com/argocd-diff-action/argocd-diff-action/issues/19960) [#19932](https://github.com/argocd-diff-action/argocd-diff-action/issues/19932) [#19949](https://github.com/argocd-diff-action/argocd-diff-action/issues/19949) [#19828](https://github.com/argocd-diff-action/argocd-diff-action/issues/19828) [#19919](https://github.com/argocd-diff-action/argocd-diff-action/issues/19919) [#19882](https://github.com/argocd-diff-action/argocd-diff-action/issues/19882) [#19948](https://github.com/argocd-diff-action/argocd-diff-action/issues/19948) [#19944](https://github.com/argocd-diff-action/argocd-diff-action/issues/19944) [#19943](https://github.com/argocd-diff-action/argocd-diff-action/issues/19943) [#19937](https://github.com/argocd-diff-action/argocd-diff-action/issues/19937) [#19971](https://github.com/argocd-diff-action/argocd-diff-action/issues/19971) [#19877](https://github.com/argocd-diff-action/argocd-diff-action/issues/19877) [#19970](https://github.com/argocd-diff-action/argocd-diff-action/issues/19970) [#19965](https://github.com/argocd-diff-action/argocd-diff-action/issues/19965) [#19964](https://github.com/argocd-diff-action/argocd-diff-action/issues/19964) [#19953](https://github.com/argocd-diff-action/argocd-diff-action/issues/19953) [#19960](https://github.com/argocd-diff-action/argocd-diff-action/issues/19960) [#15702](https://github.com/argocd-diff-action/argocd-diff-action/issues/15702) [#15702](https://github.com/argocd-diff-action/argocd-diff-action/issues/15702) [#11391](https://github.com/argocd-diff-action/argocd-diff-action/issues/11391) [#11397](https://github.com/argocd-diff-action/argocd-diff-action/issues/11397) [#11351](https://github.com/argocd-diff-action/argocd-diff-action/issues/11351) [#11412](https://github.com/argocd-diff-action/argocd-diff-action/issues/11412) [#11361](https://github.com/argocd-diff-action/argocd-diff-action/issues/11361) [#11329](https://github.com/argocd-diff-action/argocd-diff-action/issues/11329) [#11361](https://github.com/argocd-diff-action/argocd-diff-action/issues/11361) [#11412](https://github.com/argocd-diff-action/argocd-diff-action/issues/11412) [#11](https://github.com/argocd-diff-action/argocd-diff-action/issues/11) [#11412](https://github.com/argocd-diff-action/argocd-diff-action/issues/11412)
* **deps:** bump actions/checkout from 4 to 5 ([#170](https://github.com/argocd-diff-action/argocd-diff-action/issues/170)) ([a7d32d7](https://github.com/argocd-diff-action/argocd-diff-action/commit/a7d32d77d2294a2e722291cd018633ac1a4dc601)), closes [actions/checkout#2226](https://github.com/actions/checkout/issues/2226) [actions/checkout#2238](https://github.com/actions/checkout/issues/2238) [actions/checkout#1971](https://github.com/actions/checkout/issues/1971) [actions/checkout#1977](https://github.com/actions/checkout/issues/1977) [actions/checkout#2043](https://github.com/actions/checkout/issues/2043) [actions/checkout#2044](https://github.com/actions/checkout/issues/2044) [actions/checkout#2194](https://github.com/actions/checkout/issues/2194) [actions/checkout#2224](https://github.com/actions/checkout/issues/2224) [actions/checkout#2236](https://github.com/actions/checkout/issues/2236) [actions/checkout#2237](https://github.com/actions/checkout/issues/2237) [actions/checkout#1971](https://github.com/actions/checkout/issues/1971) [actions/checkout#1977](https://github.com/actions/checkout/issues/1977) [actions/checkout#2043](https://github.com/actions/checkout/issues/2043) [actions/checkout#2194](https://github.com/actions/checkout/issues/2194) [actions/checkout#2236](https://github.com/actions/checkout/issues/2236) [actions/checkout#1941](https://github.com/actions/checkout/issues/1941) [actions/checkout#1946](https://github.com/actions/checkout/issues/1946) [actions/checkout#1924](https://github.com/actions/checkout/issues/1924) [actions/checkout#1919](https://github.com/actions/checkout/issues/1919) [actions/checkout#2226](https://github.com/actions/checkout/issues/2226) [actions/checkout#1971](https://github.com/actions/checkout/issues/1971) [actions/checkout#1977](https://github.com/actions/checkout/issues/1977) [actions/checkout#2043](https://github.com/actions/checkout/issues/2043) [actions/checkout#2044](https://github.com/actions/checkout/issues/2044) [actions/checkout#2194](https://github.com/actions/checkout/issues/2194) [actions/checkout#2224](https://github.com/actions/checkout/issues/2224) [actions/checkout#2236](https://github.com/actions/checkout/issues/2236) [actions/checkout#1941](https://github.com/actions/checkout/issues/1941) [actions/checkout#1946](https://github.com/actions/checkout/issues/1946) [actions/checkout#1924](https://github.com/actions/checkout/issues/1924) [actions/checkout#1180](https://github.com/actions/checkout/issues/1180) [actions/checkout#1777](https://github.com/actions/checkout/issues/1777) [actions/checkout#1872](https://github.com/actions/checkout/issues/1872) [actions/checkout#1739](https://github.com/actions/checkout/issues/1739) [actions/checkout#1697](https://github.com/actions/checkout/issues/1697) [actions/checkout#1774](https://github.com/actions/checkout/issues/1774) [actions/checkout#1776](https://github.com/actions/checkout/issues/1776) [actions/checkout#1732](https://github.com/actions/checkout/issues/1732) [actions/checkout#1703](https://github.com/actions/checkout/issues/1703) [actions/checkout#1694](https://github.com/actions/checkout/issues/1694) [actions/checkout#1696](https://github.com/actions/checkout/issues/1696) [actions/checkout#1695](https://github.com/actions/checkout/issues/1695) [actions/checkout#1707](https://github.com/actions/checkout/issues/1707) [actions/checkout#1692](https://github.com/actions/checkout/issues/1692) [actions/checkout#1688](https://github.com/actions/checkout/issues/1688) [actions/checkout#1693](https://github.com/actions/checkout/issues/1693) [actions/checkout#1643](https://github.com/actions/checkout/issues/1643) [#2238](https://github.com/argocd-diff-action/argocd-diff-action/issues/2238) [#2226](https://github.com/argocd-diff-action/argocd-diff-action/issues/2226)
* **deps:** bump amannn/action-semantic-pull-request from 5 to 6 ([#169](https://github.com/argocd-diff-action/argocd-diff-action/issues/169)) ([56cfcc6](https://github.com/argocd-diff-action/argocd-diff-action/commit/56cfcc62093636505d1ac4d0ea8198a06f4b2ae5)), closes [#287](https://github.com/argocd-diff-action/argocd-diff-action/issues/287) [#287](https://github.com/argocd-diff-action/argocd-diff-action/issues/287) [#269](https://github.com/argocd-diff-action/argocd-diff-action/issues/269) [#262](https://github.com/argocd-diff-action/argocd-diff-action/issues/262) [#263](https://github.com/argocd-diff-action/argocd-diff-action/issues/263) [#261](https://github.com/argocd-diff-action/argocd-diff-action/issues/261) [#240](https://github.com/argocd-diff-action/argocd-diff-action/issues/240) [#229](https://github.com/argocd-diff-action/argocd-diff-action/issues/229) [#226](https://github.com/argocd-diff-action/argocd-diff-action/issues/226) [#208](https://github.com/argocd-diff-action/argocd-diff-action/issues/208) [#207](https://github.com/argocd-diff-action/argocd-diff-action/issues/207) [#205](https://github.com/argocd-diff-action/argocd-diff-action/issues/205) [#205](https://github.com/argocd-diff-action/argocd-diff-action/issues/205) [#289](https://github.com/argocd-diff-action/argocd-diff-action/issues/289) [#287](https://github.com/argocd-diff-action/argocd-diff-action/issues/287) [#286](https://github.com/argocd-diff-action/argocd-diff-action/issues/286) [#231](https://github.com/argocd-diff-action/argocd-diff-action/issues/231) [#281](https://github.com/argocd-diff-action/argocd-diff-action/issues/281) [#280](https://github.com/argocd-diff-action/argocd-diff-action/issues/280) [#276](https://github.com/argocd-diff-action/argocd-diff-action/issues/276) [#272](https://github.com/argocd-diff-action/argocd-diff-action/issues/272)

## [0.5.3](https://github.com/argocd-diff-action/argocd-diff-action/compare/0.5.2...0.5.3) (2025-07-21)

### Build & Dependencies

* **deps-dev:** bump conventional-changelog-conventionalcommits from 8.0.0 to 9.1.0 ([#159](https://github.com/argocd-diff-action/argocd-diff-action/issues/159)) ([0078f46](https://github.com/argocd-diff-action/argocd-diff-action/commit/0078f46ccca748d4a479bea5487ddf95b13f2146))
* **deps-dev:** bump jest-circus from 29.7.0 to 30.0.4 ([#160](https://github.com/argocd-diff-action/argocd-diff-action/issues/160)) ([96b588b](https://github.com/argocd-diff-action/argocd-diff-action/commit/96b588beb86782efb878f6d2fbb412225211e6e8))
* **deps-dev:** bump sinon from 19.0.4 to 21.0.0 ([#158](https://github.com/argocd-diff-action/argocd-diff-action/issues/158)) ([8a4c9dd](https://github.com/argocd-diff-action/argocd-diff-action/commit/8a4c9dd2f0b13b90712e923bd357c6991906bcd1))
* **deps-dev:** bump the npm-development group with 6 updates ([#157](https://github.com/argocd-diff-action/argocd-diff-action/issues/157)) ([b3ad399](https://github.com/argocd-diff-action/argocd-diff-action/commit/b3ad39943067c077724b3f9f5a37f43a1699085f))
* update dev dependencies ([b19ab5f](https://github.com/argocd-diff-action/argocd-diff-action/commit/b19ab5f68c95f18ee472aef59e2a1c2999a9c605))

### Tests

* fix difference in execCommand failure on osx ([d476339](https://github.com/argocd-diff-action/argocd-diff-action/commit/d476339f788ad083a48270bcc3de5cd36b81b111))

## [0.5.2](https://github.com/argocd-diff-action/argocd-diff-action/compare/0.5.1...0.5.2) (2025-07-16)

### Build & Dependencies

* **deps-dev:** bump the npm-development group across 1 directory with 10 updates ([#156](https://github.com/argocd-diff-action/argocd-diff-action/issues/156)) ([785a23f](https://github.com/argocd-diff-action/argocd-diff-action/commit/785a23f602c77afd5d1940c36913f2dffc55a1e0))
* **deps:** bump @actions/github from 6.0.0 to 6.0.1 in the npm-production group ([#152](https://github.com/argocd-diff-action/argocd-diff-action/issues/152)) ([78f13fb](https://github.com/argocd-diff-action/argocd-diff-action/commit/78f13fb9c82fb5978d6bc9b6ef20b6973ea249b8))

## [0.5.1](https://github.com/argocd-diff-action/argocd-diff-action/compare/0.5.0...0.5.1) (2025-04-08)

### Build & Dependencies

* **deps-dev:** bump the npm-development group with 2 updates ([#144](https://github.com/argocd-diff-action/argocd-diff-action/issues/144)) ([7dfebed](https://github.com/argocd-diff-action/argocd-diff-action/commit/7dfebed84653eb2a40fe8f7e5c4d1afcd1715e3a)), closes [#10861](https://github.com/argocd-diff-action/argocd-diff-action/issues/10861) [#10986](https://github.com/argocd-diff-action/argocd-diff-action/issues/10986) [#10772](https://github.com/argocd-diff-action/argocd-diff-action/issues/10772)
* **deps-dev:** bump the npm-development group with 6 updates ([#145](https://github.com/argocd-diff-action/argocd-diff-action/issues/145)) ([9b21c54](https://github.com/argocd-diff-action/argocd-diff-action/commit/9b21c54909d1d469868be6617dd174b951bef7ef)), closes [#19401](https://github.com/argocd-diff-action/argocd-diff-action/issues/19401) [#19540](https://github.com/argocd-diff-action/argocd-diff-action/issues/19540) [#19568](https://github.com/argocd-diff-action/argocd-diff-action/issues/19568) [#19558](https://github.com/argocd-diff-action/argocd-diff-action/issues/19558) [#19159](https://github.com/argocd-diff-action/argocd-diff-action/issues/19159) [#19560](https://github.com/argocd-diff-action/argocd-diff-action/issues/19560) [#19527](https://github.com/argocd-diff-action/argocd-diff-action/issues/19527) [#19493](https://github.com/argocd-diff-action/argocd-diff-action/issues/19493) [#19595](https://github.com/argocd-diff-action/argocd-diff-action/issues/19595) [#19584](https://github.com/argocd-diff-action/argocd-diff-action/issues/19584) [#19594](https://github.com/argocd-diff-action/argocd-diff-action/issues/19594) [#19596](https://github.com/argocd-diff-action/argocd-diff-action/issues/19596) [#19578](https://github.com/argocd-diff-action/argocd-diff-action/issues/19578) [#19571](https://github.com/argocd-diff-action/argocd-diff-action/issues/19571) [#19555](https://github.com/argocd-diff-action/argocd-diff-action/issues/19555) [#19569](https://github.com/argocd-diff-action/argocd-diff-action/issues/19569) [#19602](https://github.com/argocd-diff-action/argocd-diff-action/issues/19602) [#19587](https://github.com/argocd-diff-action/argocd-diff-action/issues/19587) [#19503](https://github.com/argocd-diff-action/argocd-diff-action/issues/19503) [#19556](https://github.com/argocd-diff-action/argocd-diff-action/issues/19556) [#19577](https://github.com/argocd-diff-action/argocd-diff-action/issues/19577) [#19576](https://github.com/argocd-diff-action/argocd-diff-action/issues/19576) [#19572](https://github.com/argocd-diff-action/argocd-diff-action/issues/19572) [#19602](https://github.com/argocd-diff-action/argocd-diff-action/issues/19602) [#19594](https://github.com/argocd-diff-action/argocd-diff-action/issues/19594) [#19596](https://github.com/argocd-diff-action/argocd-diff-action/issues/19596) [#19595](https://github.com/argocd-diff-action/argocd-diff-action/issues/19595) [#19401](https://github.com/argocd-diff-action/argocd-diff-action/issues/19401) [#19587](https://github.com/argocd-diff-action/argocd-diff-action/issues/19587) [#19540](https://github.com/argocd-diff-action/argocd-diff-action/issues/19540) [#19568](https://github.com/argocd-diff-action/argocd-diff-action/issues/19568) [#19503](https://github.com/argocd-diff-action/argocd-diff-action/issues/19503) [#19556](https://github.com/argocd-diff-action/argocd-diff-action/issues/19556) [#19584](https://github.com/argocd-diff-action/argocd-diff-action/issues/19584) [#19558](https://github.com/argocd-diff-action/argocd-diff-action/issues/19558) [#19578](https://github.com/argocd-diff-action/argocd-diff-action/issues/19578) [#19577](https://github.com/argocd-diff-action/argocd-diff-action/issues/19577) [#19576](https://github.com/argocd-diff-action/argocd-diff-action/issues/19576) [#19159](https://github.com/argocd-diff-action/argocd-diff-action/issues/19159) [#19560](https://github.com/argocd-diff-action/argocd-diff-action/issues/19560) [#19569](https://github.com/argocd-diff-action/argocd-diff-action/issues/19569) [#19527](https://github.com/argocd-diff-action/argocd-diff-action/issues/19527) [#19493](https://github.com/argocd-diff-action/argocd-diff-action/issues/19493) [#19571](https://github.com/argocd-diff-action/argocd-diff-action/issues/19571) [#19572](https://github.com/argocd-diff-action/argocd-diff-action/issues/19572) [#19555](https://github.com/argocd-diff-action/argocd-diff-action/issues/19555) [#19401](https://github.com/argocd-diff-action/argocd-diff-action/issues/19401) [#19540](https://github.com/argocd-diff-action/argocd-diff-action/issues/19540) [#19568](https://github.com/argocd-diff-action/argocd-diff-action/issues/19568) [#19558](https://github.com/argocd-diff-action/argocd-diff-action/issues/19558) [#19159](https://github.com/argocd-diff-action/argocd-diff-action/issues/19159) [#19560](https://github.com/argocd-diff-action/argocd-diff-action/issues/19560) [#19527](https://github.com/argocd-diff-action/argocd-diff-action/issues/19527) [#19493](https://github.com/argocd-diff-action/argocd-diff-action/issues/19493) [#19595](https://github.com/argocd-diff-action/argocd-diff-action/issues/19595) [#19584](https://github.com/argocd-diff-action/argocd-diff-action/issues/19584) [#19594](https://github.com/argocd-diff-action/argocd-diff-action/issues/19594) [#19596](https://github.com/argocd-diff-action/argocd-diff-action/issues/19596) [#19578](https://github.com/argocd-diff-action/argocd-diff-action/issues/19578) [#19571](https://github.com/argocd-diff-action/argocd-diff-action/issues/19571) [#19555](https://github.com/argocd-diff-action/argocd-diff-action/issues/19555) [#19569](https://github.com/argocd-diff-action/argocd-diff-action/issues/19569) [#19602](https://github.com/argocd-diff-action/argocd-diff-action/issues/19602) [#19587](https://github.com/argocd-diff-action/argocd-diff-action/issues/19587) [#19503](https://github.com/argocd-diff-action/argocd-diff-action/issues/19503) [#19556](https://github.com/argocd-diff-action/argocd-diff-action/issues/19556) [#19577](https://github.com/argocd-diff-action/argocd-diff-action/issues/19577) [#19576](https://github.com/argocd-diff-action/argocd-diff-action/issues/19576) [#19572](https://github.com/argocd-diff-action/argocd-diff-action/issues/19572) [#19602](https://github.com/argocd-diff-action/argocd-diff-action/issues/19602) [#19594](https://github.com/argocd-diff-action/argocd-diff-action/issues/19594) [#19596](https://github.com/argocd-diff-action/argocd-diff-action/issues/19596) [#19595](https://github.com/argocd-diff-action/argocd-diff-action/issues/19595) [#19401](https://github.com/argocd-diff-action/argocd-diff-action/issues/19401) [#19587](https://github.com/argocd-diff-action/argocd-diff-action/issues/19587) [#19540](https://github.com/argocd-diff-action/argocd-diff-action/issues/19540) [#19568](https://github.com/argocd-diff-action/argocd-diff-action/issues/19568) [#19503](https://github.com/argocd-diff-action/argocd-diff-action/issues/19503) [#19556](https://github.com/argocd-diff-action/argocd-diff-action/issues/19556) [#19584](https://github.com/argocd-diff-action/argocd-diff-action/issues/19584) [#19558](https://github.com/argocd-diff-action/argocd-diff-action/issues/19558) [#19578](https://github.com/argocd-diff-action/argocd-diff-action/issues/19578) [#19577](https://github.com/argocd-diff-action/argocd-diff-action/issues/19577) [#19576](https://github.com/argocd-diff-action/argocd-diff-action/issues/19576) [#19159](https://github.com/argocd-diff-action/argocd-diff-action/issues/19159) [#19560](https://github.com/argocd-diff-action/argocd-diff-action/issues/19560) [#19569](https://github.com/argocd-diff-action/argocd-diff-action/issues/19569) [#19527](https://github.com/argocd-diff-action/argocd-diff-action/issues/19527) [#19493](https://github.com/argocd-diff-action/argocd-diff-action/issues/19493) [#19571](https://github.com/argocd-diff-action/argocd-diff-action/issues/19571) [#19572](https://github.com/argocd-diff-action/argocd-diff-action/issues/19572) [#19555](https://github.com/argocd-diff-action/argocd-diff-action/issues/19555) [#19602](https://github.com/argocd-diff-action/argocd-diff-action/issues/19602) [#19594](https://github.com/argocd-diff-action/argocd-diff-action/issues/19594) [#19596](https://github.com/argocd-diff-action/argocd-diff-action/issues/19596) [#19595](https://github.com/argocd-diff-action/argocd-diff-action/issues/19595) [#19](https://github.com/argocd-diff-action/argocd-diff-action/issues/19) [#11000](https://github.com/argocd-diff-action/argocd-diff-action/issues/11000) [#10961](https://github.com/argocd-diff-action/argocd-diff-action/issues/10961) [#10993](https://github.com/argocd-diff-action/argocd-diff-action/issues/10993) [#10981](https://github.com/argocd-diff-action/argocd-diff-action/issues/10981) [#10957](https://github.com/argocd-diff-action/argocd-diff-action/issues/10957) [#10963](https://github.com/argocd-diff-action/argocd-diff-action/issues/10963)
* **deps:** bump actions/create-github-app-token from 1 to 2 ([#146](https://github.com/argocd-diff-action/argocd-diff-action/issues/146)) ([91e7f01](https://github.com/argocd-diff-action/argocd-diff-action/commit/91e7f01c761ccd7fce813594b1d9757cb74e5120)), closes [#213](https://github.com/argocd-diff-action/argocd-diff-action/issues/213) [#168](https://github.com/argocd-diff-action/argocd-diff-action/issues/168) [#214](https://github.com/argocd-diff-action/argocd-diff-action/issues/214) [#210](https://github.com/argocd-diff-action/argocd-diff-action/issues/210) [#226](https://github.com/argocd-diff-action/argocd-diff-action/issues/226) [#225](https://github.com/argocd-diff-action/argocd-diff-action/issues/225) [#230](https://github.com/argocd-diff-action/argocd-diff-action/issues/230) [#229](https://github.com/argocd-diff-action/argocd-diff-action/issues/229)

### Continous Integration

* fix secrets ([b48483e](https://github.com/argocd-diff-action/argocd-diff-action/commit/b48483e6f4e757f691b156fbedfec5608f00be3d))

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
