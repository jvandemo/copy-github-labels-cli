# Copy GitHub Labels CLI

[![Build Status](https://travis-ci.org/jvandemo/copy-github-labels-cli.svg?branch=master)](https://travis-ci.org/jvandemo/copy-github-labels-cli)

CLI tool to copy GitHub labels from one repository to another.

If you want to copy GitHub labels in a script, please use [copy-github-labels](https://github.com/jvandemo/copy-github-labels) to avoid unnecessary dependencies.

## Installation

```bash
$ npm install -g copy-github-labels-cli
```

## Quick example

```bash
$ 
```

## FAQ

#### I'm getting an error "Unknown label: failed (Validation Failed)"

GitHub refuses to copy the label because it is already present in the destination repository.

#### I'm getting an error "Unknown label: failed (Not Found)"

The destination repository cannot be found.

## License

MIT

## Change log

### 0.2.0

- Added error handling
- Updated documentation

### 0.1.0

- Initial version
