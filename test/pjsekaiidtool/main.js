    const BASE_TIME = new Date('2020-09-16T01:00:00Z');
    const MULTIPLIER = 1000 * 1024 * 4096;

    function generatePlayerId() {
      const input = document.getElementById("loginTime").value;
      if (!input) return;
      const dateParts = input.split(" ");
      if (dateParts.length !== 2) {
        document.getElementById("generatedId").textContent = "無効な形式です。";
        return;
      }
      const date = dateParts[0].split("-");
      const time = dateParts[1].split(":");

      if (date.length !== 3 || time.length !== 3) {
        document.getElementById("generatedId").textContent = "無効な形式です。";
        return;
      }

      const year = parseInt(date[0]);
      const month = parseInt(date[1]) - 1;
      const day = parseInt(date[2]);
      const hour = parseInt(time[0]);
      const minute = parseInt(time[1]);
      const second = parseInt(time[2]);

      const dateObject = new Date(year, month, day, hour, minute, second);
      const seconds = Math.floor((dateObject - BASE_TIME) / 1000);
      const playerId = BigInt(seconds) * BigInt(MULTIPLIER);
      document.getElementById("generatedId").textContent = `プレイヤーID: ${playerId.toString()}`;
    }

    function calculateLoginTime() {
      const idStr = document.getElementById("playerId").value;
      if (!idStr) return;
      try {
        const id = BigInt(idStr);
        const seconds = id / BigInt(MULTIPLIER);
        const loginTime = new Date(BASE_TIME.getTime() + Number(seconds) * 1000);
        document.getElementById("calculatedTime").textContent = `初ログイン日時: ${loginTime.toLocaleString()}`;
      } catch (e) {
        document.getElementById("calculatedTime").textContent = "無効なIDです。";
      }
    }