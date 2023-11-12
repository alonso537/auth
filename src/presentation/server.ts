import express, {Router} from 'express'
import path from 'path'

interface Options {
    port: number;
    routes: Router;
    public_path?: string;
}

export class Server {

    public readonly app = express()
    private serverListener?: any;
    private readonly port: number;
    private readonly routes: Router;
    private readonly public_path: string;

    constructor(options: Options) {
        this.port = options.port
        this.routes = options.routes
        this.public_path = options.public_path || 'public'
    }

    async start() {
        //Middlewares
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))

        //public folder
        this.app.use(express.static(this.public_path))

        //Routes
        this.app.use(this.routes)

        //* SPA /^\/(?!api).*/  <== Únicamente si no empieza con la palabra api
        this.app.get('*', (req, res) => {
            const indexPath = path.join( __dirname + `../../../${ this.public_path }/index.html` );
            res.sendFile(indexPath);
          });


          this.serverListener = this.app.listen(this.port, () => {
            console.log(`Server listening on port ${this.port}`);
          });
    }

    public close() {
        this.serverListener?.close()
    }
}