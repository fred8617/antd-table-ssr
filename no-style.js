module.exports = function({ types: babelTypes }) {
  const antStyles = /antd\/.*?\/style.*?/;

  return {
    name: 'no-style',
    visitor: {
      ImportDeclaration(path, state) {
        let importFile = path.node.source.value;
        if (
          importFile.indexOf('.scss') > -1 ||
          importFile.indexOf('.less') > -1 ||
          importFile.indexOf('.css') > -1 ||
          antStyles.test(path)
        ) {
          // 干掉css 导入
          path.remove();
        }
      },
    },
  };
};
