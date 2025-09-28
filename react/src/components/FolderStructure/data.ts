export const directory: Array<Directory> = [
  {
    id: 1,
    type: 'file',
    name: 'index.ts',
    sub: null,
  },
  {
    id: 2,
    type: 'file',
    name: 'styles.css',
    sub: null,
  },
  {
    id: 3,
    type: 'folder',
    name: 'src',
    sub: [
      {
        id: 4,
        type: 'folder',
        name: 'components',
        sub: [
          {
            id: 5,
            type: 'file',
            name: 'Timer.tsx',
            sub: null,
          },
          {
            id: 6,
            type: 'file',
            name: 'Comment.tsx',
            sub: null,
          },
          {
            id: 12,
            type: 'folder',
            name: 'ui',
            sub: [
              {
                id: 13,
                type: 'file',
                name: 'Button.tsx',
                sub: null,
              },
              {
                id: 14,
                type: 'file',
                name: 'Input.tsx',
                sub: null,
              },
              {
                id: 15,
                type: 'file',
                name: 'Loader.tsx',
                sub: null,
              },
            ],
          },
        ],
      },
      {
        id: 8,
        type: 'folder',
        name: 'hooks',
        sub: [
          {
            id: 9,
            type: 'file',
            name: 'useFetch.ts',
            sub: null,
          },
          {
            id: 10,
            type: 'file',
            name: 'useDebounce.ts',
            sub: null,
          },
          {
            id: 11,
            type: 'file',
            name: 'usePrevious.ts',
            sub: null,
          },
        ],
      },
      {
        id: 7,
        type: 'file',
        name: 'index.tsx',
        sub: null,
      },
    ],
  },
];
