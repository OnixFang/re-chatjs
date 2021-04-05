const dev = {
  endpoint: 'http://rechatjs:9010',
};

const prod = {
  endpoint: 'https://rechatjs.herokuapp.com/',
};

export default process.env.NODE_ENV === 'development' ? dev : prod;
