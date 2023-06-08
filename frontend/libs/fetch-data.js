import siteUrls from "../public/siteUrls.json";

const fetchData = async (queryString) => {
    const result = await fetch(siteUrls.backendApiUrl, {
        body: JSON.stringify({ query: queryString }),
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const resultJson = result.json();
    return resultJson;
};

export const homeData = async () => {
    return await fetchData(`
    {
        articles (pagination: {pageSize: 5}) {
          data {
            attributes {
              slug
              titolo
              immagine {
                data {
                  attributes {
                    url
                  }
                }
              }
            }
          }
        }

        blogs (sort: "createdAt:desc") {
          data {
            attributes {
              titolo
              tipa
              arte
              collegamentoweb
              data
              immagine {
                data {
                  attributes {
                    url
                  }
                }
              }
            }
          }
        }

        events (pagination: {pageSize: 100}) {
          data {
            attributes {
              titolo
              anno
            }
          }
        }

        books (pagination: {pageSize: 100}, sort: "ordine:desc,mese:desc,anno:desc") {
          data {
            attributes {
              slug
              titolo
              breve
              anno
              mese
              immagine {
                data {
                  attributes {
                    url
                  }
                }
              }
            }
          }
        }
        
        essays (pagination: {pageSize: 100}) {
          data {
            attributes {
              slug
              titolo
              breve
              anno
              mese
              immagine {
                data {
                  attributes {
                    url
                  }
                }
              }
            }
          }
        }
      }
    `);
};

export const articlesData = async () => {
  return await fetchData(`
  {
    articles (pagination: {pageSize: 100}) {
      data {
        attributes {
          slug
          titolo
          breve
          tipa
          immagine {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
  `);
};

export const articleData = async (slug) => {
  return await fetchData(`
  {
    articles (filters: {slug: {eq: "${slug}"}}) {
      data {
        attributes {
          slug
          titolo
          breve
          tipa
          contenuto
          immagine {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
  `);
};

export const booksData = async () => {
  return await fetchData(`
  {
    books (pagination: {pageSize: 100}, sort: "ordine:desc,anno:desc,mese:desc") {
      data {
        attributes {
          slug
          titolo
          immagine {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
  `)
};

export const bookData = async (slug) => {
  return await fetchData(`
  {
    books (filters: {slug: {eq: "${slug}"}}) {
      data {
        attributes {
          slug
          titolo
          breve
          contenuto
          anno
          mese
          lingua
          autore
          citta
          serie
          formato
          isbn
          commento
          contano_le_pagine
          intestazione
          acquistare
          immagine {
            data {
              attributes {
                url
              }
            }
          }
          file {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }

    revisions (filters: {libri: {slug: {eq: "${slug}"}}}) {
      data {
        attributes {
          intestazione
          collegamentoweb
          file {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
  `)
};

export const essaysSlugData = async () => {
  return await fetchData(`
  {
    essays (pagination: {pageSize: 5}, sort: "id:desc") {
      data {
        attributes {
          slug
        }
      }
    }
  }
  `)
};


export const essaysData = async () => {
  return await fetchData(`
  {
    essays (pagination: {pageSize: 100}, sort: "id:desc") {
      data {
        attributes {
          slug
          titolo
          titolo_primario
          breve
          anno
          mese
          giorno
          citta
          serie
          nome_del_libro
          commento
          acquistare
          immagine {
              data {
                attributes {
                  url
                }
              }
            }
          file {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
  `)
};

export const aboutSectionsData = async (language) => {
  return await fetchData(`
  {
    pdf {
      data {
        attributes {
          italiana {
            data {
              attributes {
                url
              }
            }
          }
          inglese {
            data {
              attributes {
                url
              }
            }
          }
          francese {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
    sections (filters: {slug: {startsWith: "biografia-${language}-"}}, sort: "id") {
      data {
        attributes {
          slug
          titolo
          titolo_secondario
          titolo_del_frammento
          contenuto
          pie_di_pagina
          immagine {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
  `)
};

export const countriesSectionData = async () => {
  return await fetchData(`
  {
    sections (filters: {slug: {startsWith: "repertorio-diplomatico-"}}, sort: "id") {
      data {
        attributes {
          slug
          titolo
          titolo_secondario
          titolo_del_frammento
          contenuto
          pie_di_pagina
          immagine {
            data {
              attributes {
                url
                caption
              }
            }
          }
        }
      }
    }
  }
  `)
};

export const honorSectionData = async () => {
  return await fetchData(`
  {
    sections (filters: {slug: {eq: "onorificenze"}}) {
      data {
        attributes {
          slug
          titolo
          titolo_secondario
          titolo_del_frammento
          contenuto
          pie_di_pagina
          
          immagine {
            data {
              attributes {
                url
                caption
              }
            }
          }
        }
      }
    }
  }
  `);
}