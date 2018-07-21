const menuItems = [
  {
    key: 'introduction',
    text: 'Introduction',
    url: '/introduction',
    subtitle: 'Language processors',
  }, {
    key: 'structure-of-a-compiler',
    text: 'The Structure of a Compiler',
    url: '/structure-of-a-compiler/phases-of-a-compiler',
    subMenuKeys: [
      'phases-of-a-compiler',
      'grouping-of-phases-into-passes',
      'compiler-construction-tools',
    ],
  }, {
    key: 'the-evolution-of-programming-languages',
    text: 'The Evolution of Programming Languages',
    url: '/the-evolution-of-programming-languages/the-move-to-higher-level-languages',
    introduction: 'the-evolution-of-programming-languages',
    subtitle: 'The Evolution of programming languages',
    subMenuKeys: [
      'the-move-to-higher-level-languages',
      'impacts-on-compilers',
    ],
  }, {
    key: 'the-science-of-building-a-compiler',
    text: 'The Science of Building a Compiler',
    url: '/the-science-of-building-a-compiler',
    introduction: 'the-science-of-building-a-compiler',
    subtitle: 'The Science of Code Optimization',
  }, {
    key: 'applications-of-compiler-technology',
    text: 'Applications of Compiler Technology',
    url: '/applications-of-compiler-technology/implementation-of-high-level-programming-languages',
    introduction: 'applications-of-compiler-technology',
    subtitle: 'Implementation of High-Level Programming Languages',
    subMenuKeys: [
      'implementation-of-high-level-programming-languages',
      'optimizations-for-computer-architectures',
      'program-translations',
      'software-productivity-tools',
    ],
  }, {
    key: 'a-simple-syntax-directed-translator',
    text: 'A Simple Syntax Directed Translator',
    url: '/a-simple-syntax-directed-translator/a-translator-for-simple-expressions',
    subMenuKeys: [
      'lexical-analysis',
      'a-translator-for-simple-expressions',
      'associativity-of-operators',
      'precedence-of-operators',
    ],
  }, {
    key: 'about',
    text: 'About',
    url: '/about',
  },
];

const subMenuItems = {
  'structure-of-a-compiler': [
    {
      key: 'phases-of-a-compiler',
      text: 'Phases of a compiler',
      url: '/structure-of-a-compiler/phases-of-a-compiler',
    }, {
      key: 'grouping-of-phases-into-passes',
      text: 'Grouping of phases into passes',
      url: '/structure-of-a-compiler/grouping-of-phases-into-passes',
    }, {
      key: 'compiler-construction-tools',
      url: '/structure-of-a-compiler/compiler-construction-tools',
      text: 'Compiler-Construction Tools',
    },
  ],
  'the-evolution-of-programming-languages': [
    {
      key: 'the-move-to-higher-level-languages',
      text: 'The Move to Higher-level Languages',
      hasIntroduction: true,
      url: '/the-evolution-of-programming-languages/the-move-to-higher-level-languages',
    }, {
      key: 'impacts-on-compilers',
      text: 'Impacts on Compilers',
      url: '/the-evolution-of-programming-languages/impacts-on-compilers',
    },
  ],
  'applications-of-compiler-technology': [
    {
      key: 'implementation-of-high-level-programming-languages',
      text: 'Implementation of High-Level Programming Languages',
      hasIntroduction: true,
      url: '/applications-of-compiler-technology/implementation-of-high-level-programming-languages',
    }, {
      key: 'optimizations-for-computer-architectures',
      text: 'Optimizations for Computer Architectures',
      url: '/applications-of-compiler-technology/optimizations-for-computer-architectures',
    }, {
      key: 'program-translations',
      text: 'Program Translations',
      url: '/applications-of-compiler-technology/program-translations',
    }, {
      key: 'software-productivity-tools',
      text: 'Software Productivity Tools',
      url: '/applications-of-compiler-technology/software-productivity-tools',
    },
  ],
  'a-simple-syntax-directed-translator': [
    {
      key: 'a-translator-for-simple-expressions',
      text: 'A Translator for Simple Expressions',
      url: '/a-simple-syntax-directed-translator/a-translator-for-simple-expressions',
    }, {
      key: 'lexical-analysis',
      text: 'Lexical Analysis',
      url: '/a-simple-syntax-directed-translator/lexical-analysis',
    }, {
      key: 'associativity-of-operators',
      text: 'Associativity of Operators',
      url: '/a-simple-syntax-directed-translator/associativity-of-operators',
    }, {
      key: 'precedence-of-operators',
      text: 'Precedence of Operators',
      url: '/a-simple-syntax-directed-translator/precedence-of-operators',
    },
  ],
};

const isMenuItem = (routeName) => {
  if (typeof routeName === 'undefined') {
    return false;
  }

  const menuItemsHavingSuchSubMenuItem = menuItems.filter((item) => {
      // menu without submenu are discarded
      if (typeof item.subMenuKeys === 'undefined') {
        return false;
      }

      // matching a submenu item
      return item.subMenuKeys.indexOf(routeName) !== -1;
  });

  // When no submenu matches, we are deadling with a menu item
  return menuItemsHavingSuchSubMenuItem.length === 0;
};

const isSubMenuItem = routeName => (!isMenuItem(routeName));

const isFirstChildOfMenuItem = (routeName, path) => {
  if (!isSubMenuItem(routeName)) {
    return false;
  }

  const matchingMenuItems = menuItems.filter(item => (item.url === path));

  return matchingMenuItems.length === 1;
};

const hasParent = (routeName) => {
  if (!isSubMenuItem(routeName)) {
    return false;
  }

  return true;
};

const getParent = (routeName) => {
  if (!hasParent(routeName)) {
    return undefined;
  }

  const menuItemsHavingSuchSubMenuItem = menuItems.filter((item) => {
    // menu without submenu are discarded
    if (typeof item.subMenuKeys === 'undefined') {
      return false;
    }

    // matching a submenu item
    return item.subMenuKeys.indexOf(routeName) !== -1;
  });

  if (menuItemsHavingSuchSubMenuItem.length !== 1) {
    throw new Error('Logic exception: There should be exactly a matching menu');
  }

  return menuItemsHavingSuchSubMenuItem[0].key;
};

const haveSameParent = (firstRouteName, secondRouteName) => {
  if (typeof hasParent(firstRouteName) === 'undefined'
  || typeof hasParent(secondRouteName) === 'undefined') {
    return false;
  }

  return getParent(firstRouteName) === getParent(secondRouteName);
};

export default {
  menuItems,
  subMenuItems,
  methods: {
    isMenuItem,
    isSubMenuItem,
    isFirstChildOfMenuItem,
    haveSameParent,
  },
};
