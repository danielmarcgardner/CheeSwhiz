
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cheeses').del()
    .then(function () {
      // Inserts seed entries
      return Promise.all([
        knex('cheeses').insert({
          id: 1,
          name: 'Mahon',
          animal_id: 1,
          firmness_id: 1,
          user_id: 1
        }),
        knex('cheeses').insert({
          id: 2,
          name: 'Swiss',
          animal_id: 1,
          firmness_id: 1,
          user_id: 1
        }),
        knex('cheeses').insert({
          id: 3,
          name: 'Gruyere',
          animal_id: 1,
          firmness_id: 1,
          user_id: 1
        }),
        knex('cheeses').insert({
          id: 4,
          name: 'Emmental',
          animal_id: 1,
          firmness_id: 1,
          user_id: 1
        }),
        knex('cheeses').insert({
          id: 5,
          name: 'Grana Padano',
          animal_id: 1,
          firmness_id: 1,
          user_id: 1
        }),
        knex('cheeses').insert({
          id: 6,
          name: 'Cotija',
          animal_id: 1,
          firmness_id: 1,
          user_id: 1
        }),
        knex('cheeses').insert({
          id: 7,
          name: 'Parmigano-Reggiano',
          animal_id: 1,
          firmness_id: 1,
          user_id: 1
        }),
        knex('cheeses').insert({
          id: 8,
          name: 'Parmesan',
          animal_id: 1,
          firmness_id: 1,
          user_id: 1
        }),
        knex('cheeses').insert({
          id: 9,
          name: 'Asiago',
          animal_id: 1,
          firmness_id: 1,
          user_id: 1
        }),
        knex('cheeses').insert({
          id: 10,
          name: 'Comte',
          animal_id: 1,
          firmness_id: 1,
          user_id: 1
        }),
        knex('cheeses').insert({
          id: 11,
          name: 'Queso Oaxaca',
          animal_id: 1,
          firmness_id: 2,
          user_id: 1
        }),
        knex('cheeses').insert({
          id: 12,
          name: 'Tilsit',
          animal_id: 1,
          firmness_id: 2,
          user_id: 1
        }),
        knex('cheeses').insert({
          id: 13,
          name: 'Cheddar',
          animal_id: 1,
          firmness_id: 2,
          user_id: 1
        }),
        knex('cheeses').insert({
          id: 14,
          name: 'Stilton',
          animal_id: 1,
          firmness_id: 2,
          user_id: 1
        }),
        knex('cheeses').insert({
          id: 15,
          name: 'Gouda',
          animal_id: 1,
          firmness_id: 2,
          user_id: 1
        }),
        knex('cheeses').insert({
          id: 16,
          name: 'Provolone',
          animal_id: 1,
          firmness_id: 2,
          user_id: 1
        }),
        knex('cheeses').insert({
          id: 17,
          name: 'Monterey Jack',
          animal_id: 1,
          firmness_id: 2,
          user_id: 1
        }),
        knex('cheeses').insert({
          id: 18,
          name: 'Maytag Blue',
          animal_id: 1,
          firmness_id: 2,
          user_id: 1
        }),
        knex('cheeses').insert({
          id: 19,
          name: 'Stichelton',
          animal_id: 1,
          firmness_id: 2,
          user_id: 1
        }),
        knex('cheeses').insert({
          id: 20,
          name: 'Jarlsberg',
          animal_id: 1,
          firmness_id: 3,
          user_id: 1
        }),
        knex('cheeses').insert({
          id: 21,
          name: 'Stinking Bishop',
          animal_id: 1,
          firmness_id: 3,
          user_id: 1
        }),
        knex('cheeses').insert({
          id: 22,
          name: 'Taleggio',
          animal_id: 1,
          firmness_id: 3,
          user_id: 1
        }),
        knex('cheeses').insert({
          id: 23,
          name: 'Paneer',
          animal_id: 1,
          firmness_id: 3,
          user_id: 1
        }),
        knex('cheeses').insert({
          id: 24,
          name: 'Colby',
          animal_id: 1,
          firmness_id: 3,
          user_id: 1
        }),
        knex('cheeses').insert({
          id: 25,
          name: 'Pepper Jack',
          animal_id: 1,
          firmness_id: 3,
          user_id: 1
        }),
        knex('cheeses').insert({
          id: 26,
          name: 'Havarti',
          animal_id: 1,
          firmness_id: 3,
          user_id: 1
        }),
        knex('cheeses').insert({
          id: 27,
          name: 'Bel Paese',
          animal_id: 1,
          firmness_id: 3,
          user_id: 1
        }),
        knex('cheeses').insert({
          id: 28,
          name: 'Tomme de Savoie',
          animal_id: 1,
          firmness_id: 3,
          user_id: 1
        }),
        knex('cheeses').insert({
          id: 29,
          name: "Vacherin Mont d'Or",
          animal_id: 1,
          firmness_id: 3,
          user_id: 1
        }),
        knex('cheeses').insert({
          id: 30,
          name: 'Danbo',
          animal_id: 1,
          firmness_id: 3,
          user_id: 1
        }),
        knex('cheeses').insert({
          id: 31,
          name: "Fontina Val d'Aosta",
          animal_id: 1,
          firmness_id: 3,
          user_id: 1
        }),
        knex('cheeses').insert({
          id: 32,
          name: "Pont-l'Eveque",
          animal_id: 1,
          firmness_id: 3,
          user_id: 1
        }),
        knex('cheeses').insert({
          id: 33,
          name: 'Butterkase',
          animal_id: 1,
          firmness_id: 3,
          user_id: 1
        }),
        knex('cheeses').insert({
          id: 34,
          name: 'Limburger',
          animal_id: 1,
          firmness_id: 4,
          user_id: 1
        }),
        knex('cheeses').insert({
          id: 35,
          name: 'Brie',
          animal_id: 1,
          firmness_id: 4,
          user_id: 1
        }),
        knex('cheeses').insert({
          id: 36,
          name: 'Munster',
          animal_id: 1,
          firmness_id: 4,
          user_id: 1
        }),
        knex('cheeses').insert({
          id: 37,
          name: 'Gorgonzola',
          animal_id: 1,
          firmness_id: 4,
          user_id: 1
        }),
        knex('cheeses').insert({
          id: 38,
          name: 'Mascarpone',
          animal_id: 1,
          firmness_id: 4,
          user_id: 1
        }),
        knex('cheeses').insert({
          id: 39,
          name: 'Ricotta',
          animal_id: 1,
          firmness_id: 4,
          user_id: 1
        }),
        knex('cheeses').insert({
          id: 40,
          name: 'Camembert',
          animal_id: 1,
          firmness_id: 4,
          user_id: 1
        }),
        knex('cheeses').insert({
          id: 41,
          name: 'Langres',
          animal_id: 1,
          firmness_id: 4,
          user_id: 1
        }),
        knex('cheeses').insert({
          id: 42,
          name: 'Queso Blanco',
          animal_id: 1,
          firmness_id: 4,
          user_id: 1
        }),
        knex('cheeses').insert({
          id: 43,
          name: 'Idaho Goatster',
          animal_id: 2,
          firmness_id: 1,
          user_id: 1
        }),
        knex('cheeses').insert({
          id: 44,
          name: 'Garrotxa',
          animal_id: 2,
          firmness_id: 1,
          user_id: 1
        }),
        knex('cheeses').insert({
          id: 45,
          name: 'Majorero',
          animal_id: 2,
          firmness_id: 2,
          user_id: 1
        }),
        knex('cheeses').insert({
          id: 46,
          name: 'Clochette',
          animal_id: 2,
          firmness_id: 3,
          user_id: 1
        }),
        knex('cheeses').insert({
          id: 47,
          name: 'Humboldt Fog',
          animal_id: 2,
          firmness_id: 3,
          user_id: 1
        }),
        knex('cheeses').insert({
          id: 48,
          name: 'Charolais',
          animal_id: 2,
          firmness_id: 3,
          user_id: 1
        }),
        knex('cheeses').insert({
          id: 49,
          name: 'Pantysgawn',
          animal_id: 2,
          firmness_id: 4,
          user_id: 1
        }),
        knex('cheeses').insert({
          id: 50,
          name: 'Golden Cross',
          animal_id: 2,
          firmness_id: 4,
          user_id: 1
        }),
        knex('cheeses').insert({
          id: 51,
          name: 'Chevre Bucheron',
          animal_id: 2,
          firmness_id: 4,
          user_id: 1
        }),
        knex('cheeses').insert({
          id: 52,
          name: 'Sainte-Maure de Touraine',
          animal_id: 2,
          firmness_id: 4,
          user_id: 1
        }),
        knex('cheeses').insert({
          id: 53,
          name: 'Crottin de Chavignol',
          animal_id: 2,
          firmness_id: 4,
          user_id: 1
        }),
        knex('cheeses').insert({
          id: 54,
          name: 'Manchego',
          animal_id: 3,
          firmness_id: 1,
          user_id: 1
        }),
        knex('cheeses').insert({
          id: 55,
          name: 'Roncal',
          animal_id: 3,
          firmness_id: 1,
          user_id: 1
        }),
        knex('cheeses').insert({
          id: 56,
          name: 'Pecorino Romano',
          animal_id: 3,
          firmness_id: 1,
          user_id: 1
        }),
        knex('cheeses').insert({
          id: 57,
          name: 'Pecorino Sardo',
          animal_id: 3,
          firmness_id: 1,
          user_id: 1
        }),
        knex('cheeses').insert({
          id: 58,
          name: 'Roquefort',
          animal_id: 3,
          firmness_id: 2,
          user_id: 1
        }),
        knex('cheeses').insert({
          id: 59,
          name: 'Feta',
          animal_id: 3,
          firmness_id: 2,
          user_id: 1
        }),
        knex('cheeses').insert({
          id: 60,
          name: 'Ossau-Iraty',
          animal_id: 3,
          firmness_id: 2,
          user_id: 1
        }),
        knex('cheeses').insert({
          id: 61,
          name: 'Yorkshire Blue',
          animal_id: 3,
          firmness_id: 2,
          user_id: 1
        }),
        knex('cheeses').insert({
          id: 62,
          name: 'Fleur du Maquis',
          animal_id: 3,
          firmness_id: 4,
          user_id: 1
        }),
        knex('cheeses').insert({
          id: 63,
          name: 'Buffalo Blue',
          animal_id: 4,
          firmness_id: 3,
          user_id: 1
        }),
        knex('cheeses').insert({
          id: 64,
          name: 'Mozzarella di Bufala Campana',
          animal_id: 4,
          firmness_id: 4,
          user_id: 1
        })
      ]);
    }).then(function() {
      return knex.raw(`SELECT setval('cheeses_id_seq', (SELECT MAX(id) FROM cheeses))`);
    });
};
