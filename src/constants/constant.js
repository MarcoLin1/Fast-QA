const CATEGORY_ITEMS = [
  {
    title: 'Number of Questions',
    type: 'amount',
    options: [
      {
        label: '10',
        value: 10
      },
      {
        label: '20',
        value: 20
      },
      {
        label: '25',
        value: 25
      }
    ]
  },
  {
    title: 'Difficulty',
    type: 'difficulty',
    options: [
      {
        label: 'Easy',
        value: 'easy'
      },
      {
        label: 'Medium',
        value: 'medium'
      },
      {
        label: 'Hard',
        value: 'hard'
      }
    ]
  },
  {
    title: 'Type',
    type: 'type',
    options: [
      {
        label: 'True / False',
        value: 'boolean'
      },
      {
        label: 'Multiple Choice',
        value: 'multiple'
      }
    ]
  }
];

export default {
  CATEGORY_ITEMS
};
