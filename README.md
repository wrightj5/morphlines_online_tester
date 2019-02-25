# Morphlines Online Tester

The idea behind this tools is to provide a UI based Morphlines tester. The tool currently takes 2 inputs, a config file and an example log, and produces 1 output - the stderr/stdout from a third party Scala Morphlines tool.

## Install

``./init.sh`` will install all of your NPM modules.

``node server.js`` will start the main server.

The Scala tool is available here: ``https://bitbucket.prd.ace/projects/ACP/repos/lib.morphlines/browse``

Follow the instructions to set this up - currently the location of the compiled ML binary is hardcoded. This will be changed when I can be bothered.
