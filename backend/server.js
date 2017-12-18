const express = require('express');
const app = express();
const bodyParser = require('body-parser');
let data = require('./jobs');

let initialJobs = data.jobs;
let addedJobs = [];
let users = [
    { id: "1", email: 'su@test.fr', nickname: 'Super User', password: 'aze', role: 'admin' },
    { id: "2", email: 'user@test.fr', nickname: 'User', password: 'user', role: 'user' }
];
const secret = 'qsdjS12ozehdoIJ123DJOZJLDSCqsdeffdg123ER56SDFZedhWXojqshduzaohduihqsDAqsdq';
const jwt = require('jsonwebtoken');

const getAllJobs = () => {
    return [...addedJobs, ...initialJobs];
};


app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

const api = express.Router();
const auth = express.Router();
app.use('/auth', auth);


auth.post('/login', (req, res) => {
    if (req.body) {
        const email = req.body.email.toLocaleLowerCase();
        const password = req.body.password.toLocaleLowerCase();
        const index = users.findIndex(user => user.email === email);
        if (index > -1 && users[index].password === password) {
            let tokenRole = 'user';
            let user = users[index];
            if (user.email === 'su@test.fr') {
                tokenRole = 'admin';
            }
            const token = jwt.sign({ iss: 'http://localhost:4201', role: tokenRole, email: req.body.email }, secret);
            res.json({ success: true, token });
        } else {
            res.status(401).json({ success: false, message: 'identifiants incorrects' });
        }
    } else {
        res.status(500).json({ success: false, message: 'données manquantes' })
    }
});

auth.post('/register', (req, res) => {
    console.log('req.body ', req.body);
    if (req.body) {
        const email = req.body.email.toLocaleLowerCase().trim();
        const password = req.body.password;
        const nickname = req.body.nickname.trim();
        users = [{ id: Date.now(), email, password }, ...users];
        res.json({ success: true, users });
    } else {
        res.json({ success: false, message: 'La création a écouché.' })
    }
});

api.get('/jobs', (req, res) => {
    res.json(getAllJobs());

});

const checkUserToken = (req, res, next) => {
    // Authorization: Bearer 'token'
    if (!req.header('Authorization')) {
        return res.status(401).json({ sucess: false, message: "Header d'authentification manquant!" });
    }

    const authorizationParts = req.header('Authorization').split(' ');
    let token = authorizationParts[1];
    const decodedToken = jwt.verify(token, secret, (err, decodedToken) => {
        if (err) {
            return res.status(401).json({ success: false, message: 'Token non valide' });
        } else {
            next();
        }
    });

}

api.post('/jobs', checkUserToken, (req, res) => {
    const job = req.body;
    addedJobs = [job, ...addedJobs];
    console.log('total of jobs ' + getAllJobs().length);
    res.json(job);
})

api.get('/search/:term/:place?', (req, res) => {
    const term = req.params.term.toLowerCase().trim();
    let place = req.params.place;
    let jobs = getAllJobs().filter(j => (j.description.toLowerCase().includes(term) || j.title.toLowerCase().includes(term)));
    if (place) {
        place = place.toLowerCase().trim();
        jobs = jobs.filter(j => (j.city.toLowerCase().includes(place)));
    }
    res.json({ success: true, jobs: jobs });
});

api.get('/jobs/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const job = getAllJobs().filter(j => j.id === id); //récupère tous les jobs
    if (job.length === 1) {
        res.json({ success: true, job: job[0] });
    } else {
        res.json({ success: false, message: `Pas de job pour l'id ${id}` });
    }

});

app.use('/api', api);


const port = 4201;

app.listen(port, () => {
    console.log(`listening on port ${port}`)
});
