const dietaryList = [
    {
        id: '1',
        title: require('../assets/images/allergies.png'),
        subtitle: 'E.g. Gluten free, dairy free'
    },
    {
        id: '2',
        title: require('../assets/images/dietary.png'),
        subtitle: 'E.g. Vegan, vegetarian',
    },
    {
        id: '3',
        title: require('../assets/images/halal.png'),
        subtitle: 'E.g. Halal'

    }
];

const allergies = [
    {
        id: 'Lactose Intolerance',
        title: require('../assets/images/lactoseInt.png'),
        subtitle: 'Lactose Intolerance',
        color: 'white',
    },
    {
        id: 'Gluten Free',
        title: require('../assets/images/gluten.png'),
        subtitle: 'Gluten Free',
        color: 'white'

    },
    {
        id: 'Nut Allergies',
        title: require('../assets/images/nut.png'),
        subtitle: 'Nut Allergies',
        color: 'white',

    }
];

const specialDiet = [
    {
        id: 'Vegan',
        title: require('../assets/images/vegan.png'),
        subtitle: 'Vegan',
        color: 'white',
    },
    {
        id: 'Vegetarian',
        title: require('../assets/images/vegetarian.png'),
        subtitle: 'Vegetarian',
        color: 'white'

    },
    {
        id: 'Pesctarian',
        title: require('../assets/images/pescatarian.png'),
        subtitle: 'Pescatarian',
        color: 'white',

    }
];

const religiousReasons= [
    {
        id: 'Kosher',
        title: require('../assets/images/kosher.png'),
        subtitle: 'Kosher',
        color: 'white',
    },
    {
        id: 'Halal',
        title: require('../assets/images/halalCheck.png'),
        subtitle: 'Halal',
        color: 'white'

    },
    {
        id: 'Lacto-vegetarianism',
        title: require('../assets/images/lactoVeg.png'),
        subtitle: 'Lacto-vegetarianism',
        color: 'white',

    }
];

const kits = [
    {
        id: '1',
        title: require('../assets/images/thai.png'),
        name: 'Thai Kit',
        ingredients: ['lemon', 'onions', 'coriander stem', 'spur chillis', 'garlic cloves', 'Thai spice packet', 'chicken breast'],
        quantity: [1, 2, 1, 2, 3, 1, 1],
        info : 'Thai meals often contain a healthy balance of proteins, fats, and carbs!',
        price: 10,
    },
    {
        id: '2',
        title: require('../assets/images/italian.png'),
        name: 'Italian Kit',
        ingredients: ['tomatoes', 'champignon mushrooms', 'pack of flour', 'pack of pepperonis', 'garlic cloves', 'capsicum', 'pack of mozzarella cheese'],
        quantity: [3, 2, 1, 1, 3, 1, 1],
        info : 'Italian food  helps lower levels of cancer, heart disease, inflammatory disease, and more.',
        price: 15,
    },
    {
        id: '3',
        title: require('../assets/images/mexican.png'),
        name:'Mexican Kit',
        ingredients: ['tomatoes', 'avocado', 'red onions', 'can of chickpeas', 'garlic cloves', 'cilantro stem', 'pack of prawns'],
        quantity: [2, 1, 1, 1, 3, 1, 1],
        info : 'Italian food  helps lower levels of cancer, heart disease, inflammatory disease, and more.',
        price: 12,
    },
];
// Top navigation indicator bar.
const navInfo = [
    {
        id: '1',
        title: 'Who\'s Choosing\nThis Week',
    },
    {
        id: '2',
        title: 'Set Up Your\nDietary Requirements',
    },
    {
        id: '3',
        title: 'Pick Your\nIngredient Pack',
    },
    {
        id: '4',
        title: 'Choose Delivery\nOptions',
    },

];

export {dietaryList, allergies, navInfo, specialDiet, religiousReasons, kits};