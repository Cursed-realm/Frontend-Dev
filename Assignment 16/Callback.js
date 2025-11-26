function design(next) {
  setTimeout(() => {
    console.log("Design stage finished");
    next();
  }, 1000);
}function build(next) {
  setTimeout(() => {
    console.log("Build stage finished");
    next();
  }, 1000);
}

function test(next) {
  setTimeout(() => {
    console.log("Test stage finished");
    next();
  }, 1000);
}
function deploy(next) {
  setTimeout(() => {
    console.log("Deploy stage finished");
    next();
  }, 1000);
}

function celebrate(next) {
  setTimeout(() => {
    console.log("Celebrate stage 🎉");
    next && next();
  }, 1000);
}

// Callback hell version (nested callbacks)

function runPipelineWithCallbacks() {
  console.log("Starting pipeline with callbacks...");

  design(() => {
    build(() => {
      test(() => {
        deploy(() => {
          celebrate(() => {
            console.log("Pipeline done (callbacks).\n");
          });
        });
      });
    });
  });
}

//  Async/await version 

// Helper to wrap each stage in a Promise (so we can await it)
function designAsync() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Design stage finished");
      resolve();
    }, 1000);
  });
}
function buildAsync() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Build stage finished");
      resolve();
    }, 1000);
  });
}function testAsync() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Test stage finished");
      resolve();
    }, 1000);
  });
}

function deployAsync() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Deploy stage finished");
      resolve();
    }, 1000);
  });
}

function celebrateAsync() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Celebrate stage");
      resolve();
    }, 1000);
  });
}

async function runPipelineAsync() {
  console.log("Starting pipeline with async/await...");

  await designAsync();
  await buildAsync();
  await testAsync();
  await deployAsync();
  await celebrateAsync();

  console.log("Pipeline done (async/await).\n");
}

runPipelineWithCallbacks();
setTimeout(runPipelineAsync, 6000); 
