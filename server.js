
require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

// Bonus: Log every incoming request
app.use((req, res, next) => {
  console.log(
      `${req.method} ${req.url} - ${new Date().toISOString()}`
        );
          next();
          });

            // POST /user
            app.post('/user', (req, res) => {
              const { name, email } = req.body || {};

                if (!name || !email) {
                    return res.status(400).json({
                          error: 'Name and email are required.'
                              });
                                }

                                  res.status(201).send(`Hello, ${name}!`);
                                  });

                                  // GET /user/:id
                                  app.get('/user/:id', (req, res) => {
                                    res.send(`User ${req.params.id} Profile`);
                                    });

                                    // Handle invalid JSON and other errors
                                    app.use((err, req, res, next) => {
                                      if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
                                          return res.status(400).json({
                                                error: 'Invalid JSON.'
                                                    });
                                                      }

                                                        console.error(err);
                                                          res.status(500).json({
                                                              error: 'Internal server error.'
                                                                });
                                                                });

                                                                // Handle unknown routes
                                                                app.use((req, res) => {
                                                                  res.status(404).json({
                                                                      error: 'Route not found.'
                                                                        });
                                                                        });

                                                                        app.listen(PORT, () => {
                                                                          console.log(`Server running on port ${PORT}`);
                                                                          });
                                                                          