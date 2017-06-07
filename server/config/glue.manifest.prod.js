module.exports = {
  'server': {},
  'connections': [
    {
      'port': process.env.NODE_PORT || 3001,
      'routes': {
        'cors': false
      }
    }
  ],
  'registrations': [
    { 'plugin': { 'register': 'inert' } },
    { 'plugin': { 'register': './utils/index' } },
    { 'plugin': { 'register': './app-auth/index' } },
    { 'plugin': {
      'register': './api/index',
      'routes': {
        'prefix': '/api'
      }
    }
    },
    { 'plugin': {
      'register': './ping/index',
      'routes': {
        'prefix': '/api'
      }
    }
    }
  ]
};
