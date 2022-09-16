const diets = [
  {
    _id: '<uuid>',
    name: '',
  }
]

const ingredients = [
  {
    _id: '<uuid>',
    name: '',
    excluded_in_diets: ['<diet_id>'],
  },
]

const dishes = [
  {
    _id: '<uuid>',
    name: '',
    description: '',
    image_url: '',
    category: '<category_id>', // if no category, not displayed in menu!
    recipe: {
      basic:
        [
          { type: ('ingredient' || 'dish'), _id: '<_id>', price: 0 }
        ],
      exludable:
        [
          { type: ('ingredient' || 'dish'), _id: '<_id>', price: 0 }
        ],
      changable:
        [
          [
            { type: ('ingredient' || 'dish'), _id: '<_id>', price: Number() }
          ],
          [
            { type: ('ingredient' || 'dish'), _id: '<_id>', price: Number() }
          ]
        ],
      addable:
        [
          { type: ('ingredient' || 'dish'), _id: '<_id>', price: Number() }

        ],
    },
  },
]

const categories = [
  {
    _id: '<uuid>',
    name: '',
    order: Number()
  }
]

const menus = [
  {
    _id: '<uuid>',
    dishes: ['<dish_id>'],
    categories: ['<category_id>'],
    menus: [],
    available_hours: [{ from: '<datetime>', to: '<datetime>' }]
  }
]

const kitchens = [
  {
    _id: '<uuid>',
    menus: ['<menu_id>'],
    logo: '',
    url: ''
  }
]