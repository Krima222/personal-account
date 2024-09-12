import antfu from '@antfu/eslint-config'

// export default antfu()

export default [
  ...antfu(),
  {
    rules: {
      'brace-style': ['error', 'stroustrup'],
    },
  },
]
