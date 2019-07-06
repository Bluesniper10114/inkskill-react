# Getting started
1. Clone the project from git  
`git clone http://git.dominitech.com/liccy/inkskill-react.git`  
2. Make sure your node version is v8.1 and above  
`node -v`  
3. Install dependencies  
`yarn install`  
4. Copy _example.env_ file to _.env_ and fill it. 
Please make sure your `BACKEND_PORT` is the same as `PORT` of the [inkskill-koa _.env_ file](http://git.dominitech.com/lee/inkskill-koa/blob/master/example.env)
5. Run the koa [backend server](http://git.dominitech.com/lee/inkskill-koa/blob/master/README.md)  
6. Run the app:
   - `yarn dev`  (linux environment)
   - `yarn windev`  (windows environment)
   
Application will run on http://localhost:8080/

# Deployment
Deployment is automatic when you commit to staging or master

(Give the automatic system at least 5 minutes to complete)

# Development
When developing under windows,`git commit` command will fail as pre-commit flow checks are unavailable.
While this should be solved in the future, you can commit using `git commit --no-verify` command  
