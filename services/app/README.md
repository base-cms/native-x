# fortnight-app
Management UI for fortnight project

## Requirements
This project requires [Docker Compose](https://docs.docker.com/compose/overview/) to develop and test. The [Yarn](https://yarnpkg.com) package manager is also required, and is used instead of `npm`.

## Runnning
1. Clone repository
2. Override any applicable development environment variables (see [Environment Variables](#environment-variables) below)
3. In the project root, run `yarn run start`
4. The server is now accessible on `http://localhost:8105/manage/` (or whatever port you configure)

## Interactive Terminal
You can load an interactive terminal for the app container via `yarn run terminal`. This will allow you to add, remove, or upgrade project dependencies using Yarn (among other things). Note: _the application instance must be running via `yarn run start` for the terminal to load._

## Environment Variables
Production environment variables are *not* under version control, per [Part 3 of the 12 Factors](https://12factor.net/config). As such, the [dotenv](https://www.npmjs.com/package/dotenv) package is used to manage your variables locally.
1. Create a `.env` file in the project root (at the same level as the `package.json` file)
2. Set (or change) values for the following variables:
```ini
EMBER_SERVE_PORT=8105
EMBER_LIVER_PORT=8106
EMBER_TESTS_PORT=8107
EMBER_GRAPH_PROXY=http://docker.for.mac.host.internal:8100
```
 **Note:** If you are not running on OSX, or you have customized the [cygnusb2b/fortnight-graph](https://github.com/cygnusb2b/fortnight-graph) port, you will need to customize the `EMBER_GRAPH_PROXY` URL to point to the IP/Hostname and port of your graph instance:
 - AWS: `curl http://169.254.169.254/latest/meta-data/local-ipv4`
 - *nix: `ip -4 addr show docker0 | grep -Po 'inet \K[\d.]+'`

## Development
### Docker Compose
The development and testing environments are now set up using Docker Compose. Changes to environments (such as database version or new environment variables) should be made within the relevant `docker-compose.yml` file.

#### Development
To start up the development environment, execute `yarn run start` from the project root. This will initialize the docker environment for this project and boot up your application and any dependant containers (such as mongo or redis.) The first execution will take some time to download and configure docker images. To stop your environment, press `CTRL+C` in your terminal. If your environment does not shut down cleanly, you can execute `yarn run stop` to clean up and shutdown the environment.

You can optionally execute `yarn run start &` to cause your terminal to return to the prompt immediately (logs will continue to display) to allow you to execute additional commands. To stop your environment, execute `yarn run stop`.

To re-initialize your entire environment, execute `yarn run stop` to shutdown. Then run `docker volume rm fortnightapp_node_modules` to remove the cached dependancies. Finally, execute `docker-compose -p fortnightapp rebuild` to force rebuilding the application from the project `Dockerfile` (Typically only needed when making changes to the `docker-compose.yml` configuration.) Executing `yarn run start` again will re-initialize and start up the environment from scratch.

#### Testing
The testing framework runs within a second Docker Compose environment defined in `test/docker-compose.yml`. Primarily the only difference between dev and test is that the containers shut down after execution rather than watch for changes.

The test environment can be booted and run by executing `yarn run test` or `yarn run coverage`, or manually via `docker-compose -p fortnightapptest -f test/docker-compose.yml run --entrypoint "yarn run test" test`.

### Running/Writing Tests
[ add test doc for Qunit/ember ]

 **Note:** the test command will also execute the `lint` command. In other words, if lint errors are found, the tests will also fail!

By default, running `yarn run test` will run all test files. You can optionally specify the tests to run by executing `yarn run test tests/some/test.spec.js`, or using a glob: `yarn run test "tests/some-folder/*.js"` (_make sure you include the quotes_). This is usually more efficient when writing new tests, so you don't have to wait for the entire test suite to finish when making tweaks.

#### Successful Test Criteria
You __must__ ensure that new tests will run successfully as _an individual file_ and as a part of the _global test suite_. The test(s) should pass and the container should properly exit and tear down. For example, if you've just created the`/tests/my-cool-test.spec.js` test file, then __both__ of these commands should meet the success conditions: `yarn run test` and `yarn run test tests/my-cool-test.spec.js`.

### Code Coverage
Test coverage is handled by [Instanbul/nyc](https://istanbul.js.org/). To view a coverage report, execute `yarn run coverage` at the root of the project. When adding/modifying code, the coverage should preferably stay the same (meaning new tests were added) - or get better!
