// Include the cluster module
var cluster = require('cluster');

// Code to run if we're in the master process
if (cluster.isMaster) {

    // Count the machine's CPUs
    var cpuCount = require('os').cpus().length;

    // Create a worker for each CPU
    for (var i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }

    // Listen for terminating workers
    cluster.on('exit', function (worker) {

        // Replace the terminated workers
        console.log('Worker ' + worker.id + ' died :(');
        cluster.fork();

    });

// Code to run if we're in a worker process
} else {
    var AWS = require('aws-sdk');

    AWS.config.region = process.env.REGION
    var fs = require('fs'),
        path = require('path'),
        http = require('http');

    var app = require('connect')();
    var swaggerTools = require('swagger-tools');
    var jsyaml = require('js-yaml');
    var serverPort = 8080;

    // swaggerRouter configuration
    var options = {
    swaggerUi: path.join(__dirname, '/swagger.json'),
    controllers: path.join(__dirname, './controllers'),
    useStubs: process.env.NODE_ENV === 'development' // Conditionally turn on stubs (mock mode)
    };

    // The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
    var spec = fs.readFileSync(path.join(__dirname,'api/swagger.yaml'), 'utf8');
    var swaggerDoc = jsyaml.safeLoad(spec);

    // Initialize the Swagger middleware
    swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {

    // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
    app.use(middleware.swaggerMetadata());

    // Validate Swagger requests
    app.use(middleware.swaggerValidator());

    // Route validated requests to appropriate controller
    app.use(middleware.swaggerRouter(options));

    // Serve the Swagger documents and Swagger UI
    app.use(middleware.swaggerUi());

    // Start the server
    http.createServer(app).listen(serverPort, function () {
        console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
        console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
    });

    });
    // var AWS = require('aws-sdk');
    // var express = require('express');
    // var bodyParser = require('body-parser');

    // AWS.config.region = process.env.REGION

    // var sns = new AWS.SNS();
    // var ddb = new AWS.DynamoDB();

    // var ddbTable =  process.env.STARTUP_SIGNUP_TABLE;
    // var snsTopic =  process.env.NEW_SIGNUP_TOPIC;
    // var app = express();

    // app.set('view engine', 'ejs');
    // app.set('views', __dirname + '/views');
    // app.use(bodyParser.urlencoded({extended:false}));

    // app.get('/', function(req, res) {
    //     res.render('index', {
    //         static_path: 'static',
    //         theme: process.env.THEME || 'flatly',
    //         flask_debug: process.env.FLASK_DEBUG || 'false'
    //     });
    // });

    // app.post('/signup', function(req, res) {
    //     var item = {
    //         'email': {'S': req.body.email},
    //         'name': {'S': req.body.name},
    //         'preview': {'S': req.body.previewAccess},
    //         'theme': {'S': req.body.theme}
    //     };

    //     ddb.putItem({
    //         'TableName': ddbTable,
    //         'Item': item,
    //         'Expected': { email: { Exists: false } }        
    //     }, function(err, data) {
    //         if (err) {
    //             var returnStatus = 500;

    //             if (err.code === 'ConditionalCheckFailedException') {
    //                 returnStatus = 409;
    //             }

    //             res.status(returnStatus).end();
    //             console.log('DDB Error: ' + err);
    //         } else {
    //             sns.publish({
    //                 'Message': 'Name: ' + req.body.name + "\r\nEmail: " + req.body.email 
    //                                     + "\r\nPreviewAccess: " + req.body.previewAccess 
    //                                     + "\r\nTheme: " + req.body.theme,
    //                 'Subject': 'New user sign up!!!',
    //                 'TopicArn': snsTopic
    //             }, function(err, data) {
    //                 if (err) {
    //                     res.status(500).end();
    //                     console.log('SNS Error: ' + err);
    //                 } else {
    //                     res.status(201).end();
    //                 }
    //             });            
    //         }
    //     });
    // });

    // var port = process.env.PORT || 3000;

    // var server = app.listen(port, function () {
    //     console.log('Server running at http://127.0.0.1:' + port + '/');
    // });
}