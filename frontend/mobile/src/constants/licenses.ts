// 작성자 정보 타입
export interface Author {
  name?: string; // 작성자 이름
  email?: string; // 작성자 이메일
  url?: string; // 작성자 웹사이트 URL
}

// 저장소 정보 타입
export interface Repository {
  type?: string; // 저장소 타입 (예: git)
  url?: string; // 저장소 URL
  directory?: string; // 저장소 디렉토리
}

// 라이선스 정보 타입
export interface License {
  libraryName?: string; // 라이브러리 이름
  version?: string; // 버전
  _license?: string; // 라이선스 타입 (예: MIT, Apache-2.0)
  _description?: string; // 라이브러리 설명
  homepage?: string; // 홈페이지 URL
  author?: Author | string; // 작성자 정보
  repository?: Repository | null; // 저장소 정보
  _licenseContent?: string; // 라이선스 전문
}

// 라이선스 목록 타입
export type LicenseList = License[];

// 프로젝트 루트 terminal에서
// react-native-oss-license --json --only-direct-dependency --skip-not-required 를 입력하여 나오는 string 배열을 복사하여 사용

export const licenses: LicenseList = [
  {
    libraryName: '@expo/metro-runtime',
    version: '5.0.4',
    _license: 'MIT',
    _description: 'Tools for making advanced Metro bundler features work',
    homepage: 'https://github.com/expo/expo/tree/main/packages/@expo/metro-runtime',
    author: { name: '650 Industries, Inc.' },
    repository: { type: 'git', url: 'git+https://github.com/expo/expo.git' },
  },
  {
    libraryName: '@gorhom/bottom-sheet',
    version: '5.2.6',
    _license: 'MIT',
    _description: 'A performant interactive bottom sheet with fully configurable options 🚀',
    homepage: 'https://gorhom.dev/react-native-bottom-sheet/',
    author: { name: 'Mo Gorhom', url: 'https://gorhom.dev' },
    repository: { type: 'git', url: 'git+https://github.com/gorhom/react-native-bottom-sheet.git' },
    _licenseContent:
      'MIT License\n\nCopyright (c) 2020 Mo Gorhom\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the "Software"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.\n',
  },
  {
    libraryName: '@react-native-async-storage/async-storage',
    version: '2.1.2',
    _license: 'MIT',
    _description: 'Asynchronous, persistent, key-value storage system for React Native.',
    homepage: 'https://github.com/react-native-async-storage/async-storage#readme',
    author: { name: 'Krzysztof Borowy', email: 'contact@kborowy.com' },
    repository: {
      type: 'git',
      url: 'git+https://github.com/react-native-async-storage/async-storage.git',
      directory: 'packages/default-storage-backend',
    },
    _licenseContent:
      'MIT License\n\nCopyright (c) 2015-present, Facebook, Inc.\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the "Software"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.',
  },
  {
    libraryName: '@react-native-community/masked-view',
    version: '0.1.11',
    _license: 'MIT',
    _description: 'React Native MaskedView component',
    homepage: 'https://github.com/react-native-community/react-native-masked-view#readme',
    author: { name: 'Mike Nedosekin', email: 'crespo8800@gmail.com' },
    repository: {
      type: 'git',
      url: 'git+https://github.com/react-native-community/react-native-masked-view.git',
    },
  },
  {
    libraryName: '@react-navigation/bottom-tabs',
    version: '7.4.6',
    _license: 'MIT',
    _description: 'Bottom tab navigator following iOS design guidelines',
    homepage: 'https://github.com/react-navigation/react-navigation#readme',
    repository: {
      type: 'git',
      url: 'git+https://github.com/react-navigation/react-navigation.git',
      directory: 'packages/bottom-tabs',
    },
    _licenseContent:
      'MIT License\n\nCopyright (c) 2017 React Navigation Contributors\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the "Software"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.\n',
  },
  {
    libraryName: '@react-navigation/native',
    version: '7.1.17',
    _license: 'MIT',
    _description: 'React Native integration for React Navigation',
    homepage: 'https://reactnavigation.org',
    repository: {
      type: 'git',
      url: 'git+https://github.com/react-navigation/react-navigation.git',
      directory: 'packages/native',
    },
    _licenseContent:
      'MIT License\n\nCopyright (c) 2017 React Navigation Contributors\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the "Software"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.\n',
  },
  {
    libraryName: '@react-navigation/native-stack',
    version: '7.3.25',
    _license: 'MIT',
    _description: 'Native stack navigator using react-native-screens',
    homepage: 'https://github.com/software-mansion/react-native-screens#readme',
    repository: {
      type: 'git',
      url: 'git+https://github.com/react-navigation/react-navigation.git',
      directory: 'packages/native-stack',
    },
    _licenseContent:
      'MIT License\n\nCopyright (c) 2017 React Navigation Contributors\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the "Software"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.\n',
  },
  {
    libraryName: '@reduxjs/toolkit',
    version: '2.8.2',
    _license: 'MIT',
    _description:
      'The official, opinionated, batteries-included toolset for efficient Redux development',
    homepage: 'https://redux-toolkit.js.org',
    author: { name: 'Mark Erikson', email: 'mark@isquaredsoftware.com' },
    repository: { type: 'git', url: 'git+https://github.com/reduxjs/redux-toolkit.git' },
    _licenseContent:
      'MIT License\r\n\r\nCopyright (c) 2018 Mark Erikson\r\n\r\nPermission is hereby granted, free of charge, to any person obtaining a copy\r\nof this software and associated documentation files (the "Software"), to deal\r\nin the Software without restriction, including without limitation the rights\r\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r\ncopies of the Software, and to permit persons to whom the Software is\r\nfurnished to do so, subject to the following conditions:\r\n\r\nThe above copyright notice and this permission notice shall be included in all\r\ncopies or substantial portions of the Software.\r\n\r\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r\nSOFTWARE.\r\n',
  },
  {
    libraryName: '@tanstack/react-query',
    version: '5.85.0',
    _license: 'MIT',
    _description: 'Hooks for managing, caching and syncing asynchronous and remote data in React',
    homepage: 'https://tanstack.com/query',
    author: { name: 'tannerlinsley' },
    repository: {
      type: 'git',
      url: 'git+https://github.com/TanStack/query.git',
      directory: 'packages/react-query',
    },
    _licenseContent:
      'MIT License\n\nCopyright (c) 2021-present Tanner Linsley\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the "Software"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.\n',
  },
  {
    libraryName: '@types/redux-persist',
    version: '4.3.1',
    _license: 'MIT',
    _description:
      'Stub TypeScript definitions entry for redux-persist, which provides its own types definitions',
    homepage: 'https://github.com/rt2zz/redux-persist#readme',
    author: '',
    repository: { type: 'git', url: 'git+https://github.com/rt2zz/redux-persist.git' },
  },
  {
    libraryName: 'axios',
    version: '1.11.0',
    _license: 'MIT',
    _description: 'Promise based HTTP client for the browser and node.js',
    homepage: 'https://axios-http.com',
    author: { name: 'Matt Zabriskie' },
    repository: { type: 'git', url: 'git+https://github.com/axios/axios.git' },
    _licenseContent:
      '# Copyright (c) 2014-present Matt Zabriskie & Collaborators\n\nPermission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n',
  },
  {
    libraryName: 'dayjs',
    version: '1.11.13',
    _license: 'MIT',
    _description:
      '2KB immutable date time library alternative to Moment.js with the same modern API ',
    homepage: 'https://day.js.org',
    author: { name: 'iamkun' },
    repository: { type: 'git', url: 'git+https://github.com/iamkun/dayjs.git' },
    _licenseContent:
      'MIT License\n\nCopyright (c) 2018-present, iamkun\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the "Software"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.\n',
  },
  {
    libraryName: 'expo',
    version: '53.0.20',
    _license: 'MIT',
    _description: 'The Expo SDK',
    homepage: 'https://github.com/expo/expo/tree/main/packages/expo',
    author: { name: 'Expo' },
    repository: {
      type: 'git',
      url: 'git+https://github.com/expo/expo.git',
      directory: 'packages/expo',
    },
  },
  {
    libraryName: 'expo-linear-gradient',
    version: '14.1.5',
    _license: 'MIT',
    _description: 'Provides a React component that renders a gradient view.',
    homepage: 'https://docs.expo.dev/versions/latest/sdk/linear-gradient/',
    author: { name: '650 Industries, Inc.' },
    repository: {
      type: 'git',
      url: 'git+https://github.com/expo/expo.git',
      directory: 'packages/expo-linear-gradient',
    },
  },
  {
    libraryName: 'expo-status-bar',
    version: '2.2.3',
    _license: 'MIT',
    _description:
      'Provides the same interface as the React Native StatusBar API, but with slightly different defaults to work great in Expo environments.',
    homepage: 'https://docs.expo.dev/versions/latest/sdk/status-bar/',
    author: { name: '650 Industries, Inc.' },
    repository: {
      type: 'git',
      url: 'git+https://github.com/expo/expo.git',
      directory: 'packages/expo-status-bar',
    },
  },
  {
    libraryName: 'lottie-react-native',
    version: '7.2.2',
    _license: 'Apache-2.0',
    _description: 'React Native bindings for Lottie',
    homepage: 'https://airbnb.io/lottie/#/react-native',
    author: { name: 'Emilio Rodriguez', email: 'emiliorodriguez@gmail.com' },
    repository: {
      type: 'git',
      url: 'git+https://github.com/react-native-community/lottie-react-native.git',
    },
  },
  {
    libraryName: 'react',
    version: '19.0.0',
    _license: 'MIT',
    _description: 'React is a JavaScript library for building user interfaces.',
    homepage: 'https://react.dev/',
    repository: {
      type: 'git',
      url: 'git+https://github.com/facebook/react.git',
      directory: 'packages/react',
    },
    _licenseContent:
      'MIT License\n\nCopyright (c) Meta Platforms, Inc. and affiliates.\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the "Software"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.\n',
  },
  {
    libraryName: 'react-dom',
    version: '19.0.0',
    _license: 'MIT',
    _description: 'React package for working with the DOM.',
    homepage: 'https://react.dev/',
    repository: {
      type: 'git',
      url: 'git+https://github.com/facebook/react.git',
      directory: 'packages/react-dom',
    },
    _licenseContent:
      'MIT License\n\nCopyright (c) Meta Platforms, Inc. and affiliates.\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the "Software"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.\n',
  },
  {
    libraryName: 'react-hook-form',
    version: '7.62.0',
    _license: 'MIT',
    _description: 'Performant, flexible and extensible forms library for React Hooks',
    homepage: 'https://react-hook-form.com',
    author: { name: 'Beier', email: 'bluebill1049@hotmail.com', url: 'Bill' },
    repository: { type: 'git', url: 'git+https://github.com/react-hook-form/react-hook-form.git' },
    _licenseContent:
      'MIT License\n\nCopyright (c) 2019-present Beier(Bill) Luo\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the "Software"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.\n',
  },
  {
    libraryName: 'react-native',
    version: '0.79.5',
    _license: 'MIT',
    _description: 'A framework for building native apps using React',
    homepage: 'https://reactnative.dev/',
    repository: {
      type: 'git',
      url: 'git+https://github.com/facebook/react-native.git',
      directory: 'packages/react-native',
    },
    _licenseContent:
      'MIT License\n\nCopyright (c) Meta Platforms, Inc. and affiliates.\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the "Software"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.\n',
  },
  {
    libraryName: 'react-native-calendars',
    version: '1.1313.0',
    _license: 'MIT',
    _description: 'React Native Calendar Components',
    homepage: 'https://github.com/wix/react-native-calendars#readme',
    author: { name: 'Wix.com' },
    repository: { type: 'git', url: 'git+https://github.com/wix/react-native-calendars.git' },
    _licenseContent:
      'The MIT License (MIT)\n\nCopyright (c) 2017 Wix.com\n\nPermission is hereby granted, free of charge, to any person obtaining a copy of\nthis software and associated documentation files (the "Software"), to deal in\nthe Software without restriction, including without limitation the rights to\nuse, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of\nthe Software, and to permit persons to whom the Software is furnished to do so,\nsubject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS\nFOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR\nCOPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER\nIN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN\nCONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n',
  },
  {
    libraryName: 'react-native-gesture-handler',
    version: '2.24.0',
    _license: 'MIT',
    _description:
      'Declarative API exposing native platform touch and gesture system to React Native',
    homepage: 'https://github.com/software-mansion/react-native-gesture-handler#readme',
    author: { name: 'Krzysztof Magiera', email: 'krzys.magiera@gmail.com' },
    repository: {
      type: 'git',
      url: 'git+https://github.com/software-mansion/react-native-gesture-handler.git',
    },
    _licenseContent:
      'The MIT License (MIT)\n\nCopyright (c) 2016 Software Mansion <swmansion.com>\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the "Software"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.\n',
  },
  {
    libraryName: 'react-native-markdown-display',
    version: '7.0.2',
    _license: 'MIT',
    _description:
      'Markdown renderer for react-native, with CommonMark spec support + adds syntax extensions & sugar (URL autolinking, typographer), originally created by Mient-jan Stelling as react-native-markdown-renderer',
    homepage: 'https://github.com/iamacup/react-native-markdown-display/',
    author: { name: 'Mient-jan Stelling and Tom Pickard + others from the community' },
    repository: {
      type: 'git',
      url: 'git+https://github.com/iamacup/react-native-markdown-display.git',
    },
    _licenseContent:
      'MIT License\n\nCopyright (c) 2018 - 2019 Mient-jan Stelling and Tom Pickard\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the "Software"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.\n',
  },
  {
    libraryName: 'react-native-reanimated',
    version: '3.17.5',
    _license: 'MIT',
    _description: 'More powerful alternative to Animated library for React Native.',
    homepage: 'https://docs.swmansion.com/react-native-reanimated',
    author: { name: 'Krzysztof Magiera', email: 'krzys.magiera@gmail.com' },
    repository: {
      type: 'git',
      url: 'git+https://github.com/software-mansion/react-native-reanimated.git',
      directory: 'packages/react-native-reanimated',
    },
    _licenseContent:
      'The MIT License (MIT)\n\nCopyright (c) 2016 Software Mansion <swmansion.com>\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the "Software"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.\n',
  },
  {
    libraryName: 'react-native-safe-area-context',
    version: '4.5.0',
    _license: 'MIT',
    _description: 'A flexible way to handle safe area, also works on Android and web.',
    homepage: 'https://github.com/th3rdwave/react-native-safe-area-context#readme',
    author: { name: 'Janic Duplessis', email: 'janicduplessis@gmail.com' },
    repository: {
      type: 'git',
      url: 'git+https://github.com/th3rdwave/react-native-safe-area-context.git',
    },
    _licenseContent:
      'MIT License\n\nCopyright (c) 2019 Th3rd Wave\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the "Software"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.\n',
  },
  {
    libraryName: 'react-native-screens',
    version: '4.11.1',
    _license: 'MIT',
    _description: 'Native navigation primitives for your React Native app.',
    homepage: 'https://github.com/software-mansion/react-native-screens#readme',
    author: { name: 'Krzysztof Magiera', email: 'krzys.magiera@gmail.com' },
    repository: {
      type: 'git',
      url: 'git+https://github.com/software-mansion/react-native-screens.git',
    },
    _licenseContent:
      'The MIT License (MIT)\n\nCopyright (c) 2018 Software Mansion <swmansion.com>\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the "Software"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.\n',
  },
  {
    libraryName: 'react-native-svg',
    version: '15.11.2',
    _license: 'MIT',
    _description: 'SVG library for react-native',
    homepage: 'https://github.com/react-native-community/react-native-svg',
    repository: {
      type: 'git',
      url: 'git+https://github.com/react-native-community/react-native-svg.git',
    },
    _licenseContent:
      'The MIT License (MIT)\n\nCopyright (c) [2015-2016] [Horcrux]\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the "Software"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.\n',
  },
  {
    libraryName: 'react-native-vector-icons',
    version: '10.3.0',
    _license: 'MIT',
    _description:
      'Customizable Icons for React Native with support for NavBar/TabBar, image source and full styling.',
    homepage: 'https://github.com/oblador/react-native-vector-icons',
    author: { name: 'Joel Arvidsson', email: 'joel@oblador.se' },
    repository: { type: 'git', url: 'git://github.com/oblador/react-native-vector-icons.git' },
    _licenseContent:
      'The MIT License (MIT)\n\nCopyright (c) 2015 Joel Arvidsson\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the "Software"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.\n\n',
  },
  {
    libraryName: 'react-native-web',
    version: '0.20.0',
    _license: 'MIT',
    _description: 'React Native for Web',
    homepage: 'https://github.com/necolas/react-native-web#readme',
    author: { name: 'Nicolas Gallagher' },
    repository: { type: 'git', url: 'git://github.com/necolas/react-native-web.git' },
    _licenseContent:
      'MIT License\n\nCopyright (c) Nicolas Gallagher.\nCopyright (c) Meta Platforms, Inc. and affiliates.\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the "Software"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.\n',
  },
  {
    libraryName: 'react-redux',
    version: '9.2.0',
    _license: 'MIT',
    _description: 'Official React bindings for Redux',
    homepage: 'https://github.com/reduxjs/react-redux',
    author: { name: 'Dan Abramov', email: 'dan.abramov@me.com', url: 'https://github.com/gaearon' },
    repository: { type: 'git', url: 'git+https://github.com/reduxjs/react-redux.git' },
    _licenseContent:
      'The MIT License (MIT)\r\n\r\nCopyright (c) 2015-present Dan Abramov\r\n\r\nPermission is hereby granted, free of charge, to any person obtaining a copy\r\nof this software and associated documentation files (the "Software"), to deal\r\nin the Software without restriction, including without limitation the rights\r\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r\ncopies of the Software, and to permit persons to whom the Software is\r\nfurnished to do so, subject to the following conditions:\r\n\r\nThe above copyright notice and this permission notice shall be included in all\r\ncopies or substantial portions of the Software.\r\n\r\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r\nSOFTWARE.\r\n',
  },
  {
    libraryName: 'redux',
    version: '5.0.1',
    _license: 'MIT',
    _description: 'Predictable state container for JavaScript apps',
    homepage: 'http://redux.js.org',
    repository: { type: 'git', url: 'git+https://github.com/reduxjs/redux.git' },
    _licenseContent:
      'The MIT License (MIT)\n\nCopyright (c) 2015-present Dan Abramov\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the "Software"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.\n',
  },
  {
    libraryName: 'redux-persist',
    version: '6.0.0',
    _license: 'MIT',
    _description: 'persist and rehydrate redux stores',
    homepage: 'https://github.com/rt2zz/redux-persist#readme',
    author: '',
    repository: { type: 'git', url: 'git+https://github.com/rt2zz/redux-persist.git' },
    _licenseContent:
      'MIT License\n\nCopyright (c) 2017 Zack Story\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the "Software"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.\n',
  },
];
