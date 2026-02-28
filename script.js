var tasks = [];

var taskinput = document.getElementById("taskinput");
var tasklist = document.getElementById("tasklist");

taskinput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addtask();
  }
});

function addtask() {
  var text = taskinput.value;

  text = text.trim();

  if (text === "") {
    return;
  }

  var newtask = {
    id: Date.now(),
    text: text,
    done: false,
  };

  tasks.push(newtask);

  taskinput.value = "";

  showtasks();
}

function toggledone(id) {
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === id) {
      tasks[i].done = !tasks[i].done;
    }
  }
  showtasks();
}

function deletetask(id) {
  var newlist = [];

  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id !== id) {
      newlist.push(tasks[i]);
    }
  }

  tasks = newlist;
  showtasks();
}

function edittask(id) {
  showtasks(id);
}

function savetask(id) {
  var editinput = document.getElementById("edit-" + id);
  var newtext = editinput.value.trim();

  if (newtext === "") {
    return;
  }

  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === id) {
      tasks[i].text = newtext;
    }
  }

  showtasks();
}

function canceledit() {
  showtasks();
}

function cleardone() {
  var newlist = [];

  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].done === false) {
      newlist.push(tasks[i]);
    }
  }

  tasks = newlist;
  showtasks();
}

function updatestats() {
  var total = tasks.length;
  var done = 0;

  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].done === true) {
      done = done + 1;
    }
  }

  document.getElementById("stattotal").textContent = total;
  document.getElementById("statdone").textContent = done;
  document.getElementById("statleft").textContent = total - done;
}

function showtasks(editingid) {
  updatestats();

  if (tasks.length === 0) {
    tasklist.innerHTML = '<div class="empty">no tasks yet 📋</div>';
    return;
  }

  tasklist.innerHTML = "";

  for (var i = 0; i < tasks.length; i++) {
    var task = tasks[i];
    var isediting = task.id === editingid;

    var li = document.createElement("li");
    li.className = "todo-item" + (task.done ? " done" : "");

    var checkbtn = document.createElement("button");
    checkbtn.className = "btn-check";
    checkbtn.textContent = "✓";
    checkbtn.onclick = (function (id) {
      return function () {
        toggledone(id);
      };
    })(task.id);
    li.appendChild(checkbtn);

    if (isediting) {
      var editinput = document.createElement("input");
      editinput.type = "text";
      editinput.className = "edit-input";
      editinput.id = "edit-" + task.id;
      editinput.value = task.text;
      editinput.addEventListener(
        "keydown",
        (function (id) {
          return function (e) {
            if (e.key === "Enter") savetask(id);
            if (e.key === "Escape") canceledit();
          };
        })(task.id),
      );
      li.appendChild(editinput);
    } else {
      var span = document.createElement("span");
      span.className = "task-text";
      span.textContent = task.text;
      li.appendChild(span);
    }

    if (isediting) {
      var savebtn = document.createElement("button");
      savebtn.className = "btn-icon save";
      savebtn.textContent = "💾";
      savebtn.title = "save";
      savebtn.onclick = (function (id) {
        return function () {
          savetask(id);
        };
      })(task.id);
      li.appendChild(savebtn);

      var cancelbtn = document.createElement("button");
      cancelbtn.className = "btn-icon cancel";
      cancelbtn.textContent = "✕";
      cancelbtn.title = "cancel";
      cancelbtn.onclick = function () {
        canceledit();
      };
      li.appendChild(cancelbtn);
    } else {
      var editbtn = document.createElement("button");
      editbtn.className = "btn-icon edit";
      editbtn.textContent = "✎";
      editbtn.title = "edit";
      editbtn.onclick = (function (id) {
        return function () {
          edittask(id);
        };
      })(task.id);
      li.appendChild(editbtn);

      var delbtn = document.createElement("button");
      delbtn.className = "btn-icon delete";
      delbtn.textContent = "🗑";
      delbtn.title = "delete";
      delbtn.onclick = (function (id) {
        return function () {
          deletetask(id);
        };
      })(task.id);
      li.appendChild(delbtn);
    }

    tasklist.appendChild(li);

    if (isediting) {
      var inp = document.getElementById("edit-" + task.id);
      if (inp) inp.focus();
    }
  }
}

showtasks();
