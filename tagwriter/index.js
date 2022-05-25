createElectronWorkshopTag.addEventListener("click", async () => {
  try {
    const ndef = new NDEFReader();
    log("> Scan started");
    await ndef.scan();

    ndef.addEventListener("readingerror", () => {
      log("Argh! Cannot read data from the NFC tag. Try another one?");
    });

    ndef.addEventListener("reading", ({ message, serialNumber }) => {
      log(`> Serial Number: ${serialNumber}`);
      log(`> Records: (${message.records.length})`);
      log(`>: message.records: (${message.records})`);
      log(`>: message: (${message})`);

      await ndef.write({
        records: [
          {
            recordType: "url",
            data: "https://electronworkshop.com.au/?utype=nfc&uid="+serialNumber
          },
          {
            recordType: "text", data: "Electron Workshop - Tech Collective"
          }
        ]
      });
      console.log("NFC tag written.");
    });
  } catch (error) {
    log("Argh! " + error);
  }
});


scanButton.addEventListener("click", async () => {
  log("User clicked scan button");

  try {
    const ndef = new NDEFReader();
    await ndef.scan();
    log("> Scan started");

    ndef.addEventListener("readingerror", () => {
      log("Argh! Cannot read data from the NFC tag. Try another one?");
    });

    ndef.addEventListener("reading", ({ message, serialNumber }) => {
      log(`> Serial Number: ${serialNumber}`);
      log(`> Records: (${message.records.length})`);
    });
  } catch (error) {
    log("Argh! " + error);
  }
});

writeButton.addEventListener("click", async () => {
  log("User clicked write button");

  try {
    const ndef = new NDEFReader();
    await ndef.write("Hello world!");
    log("> Message written");
  } catch (error) {
    log("Argh! " + error);
  }
});

makeReadOnlyButton.addEventListener("click", async () => {
  log("User clicked make read-only button");

  try {
    const ndef = new NDEFReader();
    await ndef.makeReadOnly();
    log("> NFC tag has been made permanently read-only");
  } catch (error) {
    log("Argh! " + error);
  }
});
