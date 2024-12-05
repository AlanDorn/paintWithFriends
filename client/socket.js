export default class Socket {
  constructor(input, virtualCanvas) {
    const ws = new WebSocket(
      window.location.href.replace(/^http/, "ws").replace(/3000/, "3001")
    );

  // When a message is sent to this client it is received here
  ws.onmessage = (event) => {
    if (needsSynchronization) {
      event.data.arrayBuffer().then((buffer) => {
        const eventData = new Uint8Array(buffer);
        needsSynchronization = false;
        userId = eventData[0];
        ws.send("synchronized");

        const transactionData = eventData.slice(1);
        const processedTransactions =
          transactionManager.processTransactions(transactionData);

        processedTransactions.forEach((transaction) => {
          switch (transaction[1]) {
            case "pencil":
              pencil.drawServer(...transaction.slice(2));
              break;
          }
        });
      });
      return;
    }

    //send your data to server
    ws.send(transactionManager.buildServerMessage(input.x, input.y));

    event.data.arrayBuffer().then((buffer) => {
      const eventData = new Uint8Array(buffer);

      const numberOfCursors = eventData[0];
      let dataOffset = 1;
      for (let index = 0; index < numberOfCursors; index++) {
        handleCursorData(eventData.slice(dataOffset, dataOffset + 5));
        dataOffset += 5;
      }

      const transactionData = eventData.slice(dataOffset);
      const processedTransactions =
        transactionManager.processTransactions(transactionData);

      processedTransactions.forEach((transaction) => {
        switch (transaction[1]) {
          case "pencil":
            pencil.drawServer(...transaction.slice(2));
            break;
        }
      });
    });
  };
}

function handleCursorData(cursorData) {
  const id = cursorData[0];
  if (id === userId) return;

  let cursorElement = document.getElementById("cursor" + id);
  if (!cursorElement) {
    cursorElement = document.createElement("div");
    cursorElement.id = "cursor" + id;
    cursorElement.classList.add("cursor");
    document.body.appendChild(cursorElement);
  }
  cursorElement.style.left = `${cursorData[1] * 256 + cursorData[2]}px`; // Ensure units are added
  cursorElement.style.top = `${cursorData[3] * 256 + cursorData[4]}px`;

          if (cursorElement._removeTimeout)
            clearTimeout(cursorElement._removeTimeout);

          cursorElement._removeTimeout = setTimeout(() => {
            cursorElement.remove();
          }, 500);
        }
      }

      if (canvasEvent.length < 5) return;
      //process canvas
      for (let index = 0; index < canvasEvent.length; index += 5)
        virtualCanvas.setPixelServer(
          canvasEvent[index],
          canvasEvent[index + 1],
          canvasEvent[index + 2],
          canvasEvent[index + 3],
          canvasEvent[index + 4]
        );
    };
  }
}
