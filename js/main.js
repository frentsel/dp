const Http = function() {
  this.getPage = function(view) {
    return fetch(`pages/${view}.html`)
      .then((response) => {
        if (response.status !== 200) {
          return `<h1>Error ${response.status}</h1>`;
        }
        return response.text();
      })
      .catch(console.log);
  }
};

const App = new function() {

  let router = null;
  let http = null;

  const loadPage = async function(page) {
    const html = await http.getPage(page);
    document.querySelector('section').innerHTML = html;
  }

  this.init = function() {
    http = new Http();
    router = new Router({
      index: (...params) => loadPage('index', params),
      contact: (...params) => loadPage('contact', params),
      patterns: (pattern) => loadPage('patterns/'+ pattern),
      about: (...params) => loadPage('about', params),
      notFound: (page) => loadPage('404', page)
    });
  }
}

App.init();