import Content from '../components/content';

const programmingLanguageBasicsChildren = [
  {
    name: 'environments-and-states',
    text: 'Environment and States',
    path: '/programming-language-basics/environments-and-states',
    components: {
      content: Content.EnvironmentsAndStates,
    },
  }, {
    name: 'static-scope-and-block-structure',
    text: 'Static Scope and Block Structure',
    path: '/programming-language-basics/static-scope-and-block-structure',
    components: {
      content: Content.StaticScopeAndBlockStructure,
    },
  }, {
    name: 'declarations-and-definitions',
    text: 'Declarations and Definitions',
    path: '/programming-language-basics/declarations-and-definitions',
    components: {
      content: Content.DeclarationsAndDefinitions,
    },
  }, {
    name: 'anology-between-static-and-dynamic-scoping',
    text: 'Analogy Betweem Static and Dynamic Scoping',
    path: '/programming-language-basics/anology-between-static-and-dynamic-scoping',
    components: {
      content: Content.AnalogyBetweenStaticAndDynamicScoping,
    },
  }, {
    name: 'call-by-value',
    text: 'Call-by-Value',
    path: '/programming-language-basics/call-by-value',
    components: {
      content: Content.CallByValue,
    },
  }, {
    name: 'call-by-reference',
    text: 'Call-by-Reference',
    path: '/programming-language-basics/call-by-reference',
    components: {
      content: Content.CallByReference,
    },
  }, {
    name: 'aliasing',
    text: 'Aliasing',
    path: '/programming-language-basics/aliasing',
    components: {
      content: Content.Aliasing,
    },
  },
];

const programmingLanguageBasicsChildrenNames = programmingLanguageBasicsChildren.map((route) => {
  const name = route.name;
  return name;
});

const menuItems = [
  {
    name: 'introduction',
    text: 'Introduction',
    path: '/introduction',
    subtitle: 'Language processors',
  }, {
    name: 'structure-of-a-compiler',
    text: 'The Structure of a Compiler',
    path: '/structure-of-a-compiler/phases-of-a-compiler',
    subMenuNames: [
      'phases-of-a-compiler',
      'grouping-of-phases-into-passes',
      'compiler-construction-tools',
    ],
  }, {
    name: 'the-evolution-of-programming-languages',
    text: 'The Evolution of Programming Languages',
    path: '/the-evolution-of-programming-languages/the-move-to-higher-level-languages',
    introduction: 'the-evolution-of-programming-languages',
    subtitle: 'The Evolution of programming languages',
    subMenuNames: [
      'the-move-to-higher-level-languages',
      'impacts-on-compilers',
    ],
  }, {
    name: 'the-science-of-building-a-compiler',
    text: 'The Science of Building a Compiler',
    path: '/the-science-of-building-a-compiler',
    introduction: 'the-science-of-building-a-compiler',
    subtitle: 'The Science of Code Optimization',
  }, {
    name: 'applications-of-compiler-technology',
    text: 'Applications of Compiler Technology',
    path: '/applications-of-compiler-technology/implementation-of-high-level-programming-languages',
    introduction: 'applications-of-compiler-technology',
    subtitle: 'Implementation of High-Level Programming Languages',
    subMenuNames: [
      'implementation-of-high-level-programming-languages',
      'optimizations-for-computer-architectures',
      'program-translations',
      'software-productivity-tools',
    ],
  }, {
    name: 'programming-language-basics',
    text: 'Programming Language Basics',
    path: '/programming-language-basics/call-by-value',
    subMenuNames: programmingLanguageBasicsChildrenNames,
  }, {
    name: 'a-simple-syntax-directed-translator',
    text: 'A Simple Syntax Directed Translator',
    path: '/a-simple-syntax-directed-translator/a-translator-for-simple-expressions',
    subMenuNames: [
      'lexical-analysis',
      'a-translator-for-simple-expressions',
      'associativity-of-operators',
      'precedence-of-operators',
    ],
  }, {
    name: 'about',
    text: 'About',
    path: '/about',
  },
];

const subMenuItems = {
  'structure-of-a-compiler': [
    {
      name: 'phases-of-a-compiler',
      text: 'Phases of a compiler',
      path: '/structure-of-a-compiler/phases-of-a-compiler',
    }, {
      name: 'grouping-of-phases-into-passes',
      text: 'Grouping of phases into passes',
      path: '/structure-of-a-compiler/grouping-of-phases-into-passes',
    }, {
      name: 'compiler-construction-tools',
      path: '/structure-of-a-compiler/compiler-construction-tools',
      text: 'Compiler-Construction Tools',
    },
  ],
  'the-evolution-of-programming-languages': [
    {
      name: 'the-move-to-higher-level-languages',
      text: 'The Move to Higher-level Languages',
      hasIntroduction: true,
      path: '/the-evolution-of-programming-languages/the-move-to-higher-level-languages',
    }, {
      name: 'impacts-on-compilers',
      text: 'Impacts on Compilers',
      path: '/the-evolution-of-programming-languages/impacts-on-compilers',
    },
  ],
  'applications-of-compiler-technology': [
    {
      name: 'implementation-of-high-level-programming-languages',
      text: 'Implementation of High-Level Programming Languages',
      hasIntroduction: true,
      path: '/applications-of-compiler-technology/implementation-of-high-level-programming-languages',
    }, {
      name: 'optimizations-for-computer-architectures',
      text: 'Optimizations for Computer Architectures',
      path: '/applications-of-compiler-technology/optimizations-for-computer-architectures',
    }, {
      name: 'program-translations',
      text: 'Program Translations',
      path: '/applications-of-compiler-technology/program-translations',
    }, {
      name: 'software-productivity-tools',
      text: 'Software Productivity Tools',
      path: '/applications-of-compiler-technology/software-productivity-tools',
    },
  ],
  'programming-language-basics': programmingLanguageBasicsChildren,
  'a-simple-syntax-directed-translator': [
    {
      name: 'a-translator-for-simple-expressions',
      text: 'A Translator for Simple Expressions',
      path: '/a-simple-syntax-directed-translator/a-translator-for-simple-expressions',
    }, {
      name: 'lexical-analysis',
      text: 'Lexical Analysis',
      path: '/a-simple-syntax-directed-translator/lexical-analysis',
    }, {
      name: 'associativity-of-operators',
      text: 'Associativity of Operators',
      path: '/a-simple-syntax-directed-translator/associativity-of-operators',
    }, {
      name: 'precedence-of-operators',
      text: 'Precedence of Operators',
      path: '/a-simple-syntax-directed-translator/precedence-of-operators',
    },
  ],
};

const isMenuItem = (routeName) => {
  if (typeof routeName === 'undefined') {
    return false;
  }

  const menuItemsHavingSuchSubMenuItem = menuItems.filter((item) => {
      // menu without submenu are discarded
      if (typeof item.subMenuNames === 'undefined') {
        return false;
      }

      // matching a submenu item
      return item.subMenuNames.indexOf(routeName) !== -1;
  });

  // When no submenu matches, we are deadling with a menu item
  return menuItemsHavingSuchSubMenuItem.length === 0;
};

const isSubMenuItem = routeName => (!isMenuItem(routeName));

const isFirstChildOfMenuItem = (routeName, path) => {
  if (!isSubMenuItem(routeName)) {
    return false;
  }

  const matchingMenuItems = menuItems.filter(item => (item.path === path));

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
    if (typeof item.subMenuNames === 'undefined') {
      return false;
    }

    // matching a submenu item
    return item.subMenuNames.indexOf(routeName) !== -1;
  });

  if (menuItemsHavingSuchSubMenuItem.length !== 1) {
    throw new Error('Logic exception: There should be exactly a matching menu');
  }

  return menuItemsHavingSuchSubMenuItem[0].name;
};

const haveSameParent = (firstRouteName, secondRouteName) => {
  if (typeof hasParent(firstRouteName) === 'undefined'
  || typeof hasParent(secondRouteName) === 'undefined') {
    return false;
  }

  return getParent(firstRouteName) === getParent(secondRouteName);
};

const willCloseMenuAfterNavigation = (from, to) => {
  const willCloseMenu = isMenuItem(to.name) || (
    isSubMenuItem(from.name)
    && isSubMenuItem(to.name)
    && (
      !isFirstChildOfMenuItem(to.name, to.path)
      || haveSameParent(from.name, to.name)
    )
  );
  return willCloseMenu;
};

const routeFactory = (children, prefix) => {
  const routes = children.map((route) => {
    const childRoute = {
      components: route.components,
      name: route.name,
      path: route.path.replace(`/${prefix}/`, ''),
    };

    return childRoute;
  });

  return routes;
};

export default {
  menuItems,
  subMenuItems,
  methods: {
    isMenuItem,
    isSubMenuItem,
    isFirstChildOfMenuItem,
    haveSameParent,
    willCloseMenuAfterNavigation,
  },
  routes: {
    'programming-language-basics': (prefix) => {
      const routes = routeFactory(programmingLanguageBasicsChildren, prefix);
      return routes;
    },
  },
};
