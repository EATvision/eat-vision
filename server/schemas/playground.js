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
    included_in_diets: ['<diet_id>'],
    excluded_in_diets: ['<diet_id>'],
    tags: ['<ingredient_id>']
  },
]

const dishes = [
  {
    _id: '<uuid>',
    name: '',
    description: '',
    image_url: '',
    category: '<category_id>', // if no category, not displayed in menu!
    ingredients: {
      base:
        [
          { type: ('ingredient' || 'dish'), _id: '<_id>' }
        ],
      exludable:
        [
          { type: ('ingredient' || 'dish'), _id: '<_id>' }
        ],
      changable:
        [
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
    name: ''
  }
]

const menus = [
  {
    _id: '<uuid>',
    dishes: ['<dish_id>'],
    categories: ['<category_id>'],
    available_hours: [{ from: '<datetime>', to: '<datetime>' }]
  }
]

const kitchens = [
  {
    _id: '<uuid>',
    menus: ['<menu_id>'],
    restaurant_logo: '',
    restaurant_url: ''
  }
]