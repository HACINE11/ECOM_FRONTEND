export const navigation = [
  {
    text: 'Home',
    path: '/home',
    icon: 'home'
  },
  {
    text: 'Reclamation',
    icon: 'folder',
    items: [
      {
        text: 'list reclamation',
        path: '/listRec'
      },
      {
        text: 'add category',
        path: '/addCat'
      },
      {
        text: 'statistics',
        path: '/sta'
      }
    ]
  },
  {
    text: 'Gestion Client',
    icon: 'folder',
    items: [
      // {
      //   text: 'Profile',
      //   path: '/profile'
      // },
      // {
      //   text: 'Tasks',
      //   path: '/tasks'
      // },
      {
        text: 'Ajouter Categ-Client',
        path: '/addcategorieclient'
      },
      {
        text: 'list Client',
        path: '/clients'
      },
      {
        text: 'list Categorie-Client',
        path: '/categorieclients'
      },
      {
        text: 'Ajouter Client',
        path: '/addclient'
      },
      {
        text: 'Statistic Client',
        path: '/Statistic'
      }
    ]
  }
];
