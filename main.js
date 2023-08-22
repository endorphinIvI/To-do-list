$(function () {
  const form = $("#form");
  const inputText = $("#input");
  const listContainer = $(".listMain");

  const btnDel = "del";
  const btnDone = "done";

  let isFirstSubmit = true;
  let removeContent = [];

  $(form).submit((e) => {
    e.preventDefault();

    let taskText = inputText.val().trim();

    if (taskText === "") {
      return;
    }

    const newContent = $(
      `<li class="items"><p class="data">${taskText}</p><div class="btns"><input type="checkbox" class="done"><button type="button" class="del"><img src="/img/cross.svg" alt=""></button></div></li>`
    );

    if (isFirstSubmit === true) {
      removeContent = listContainer.children().detach();
      listContainer.html(
        '<div class= "listChange"><ul class="tasks"></ul></div>'
      );
      isFirstSubmit = false;
    }

    listContainer.find(".tasks").append(newContent);

    inputText.val("");
  });

  listContainer.on("click", "." + btnDel, function () {
    $(this).closest("li").remove();
    const taskItems = $(".tasks").children();

    if (taskItems.length === 0) {
      listContainer.empty().append(removeContent);
      isFirstSubmit = true;
    }
  });

  listContainer.on("click", "." + btnDone, function () {
    const listP = $(this).closest("li").find("p");

    if (listP.hasClass("data")) {
      listP.removeClass("data");
      listP.addClass("dataDone");
    } else {
      listP.removeClass("dataDone");
      listP.addClass("data");
    }
  });
});

// my addBlock vs add in webzdarma.cz (It's not working yet)
$(document).ready(function () {
  var startElement = $("#start")[0];
  var targetNode = startElement.nextSibling;
  var observer = new MutationObserver(function (mutationList, observer) {
    for (var mutation of mutationList) {
      if (mutation.type === "childList") {
        for (var addedNode of mutation.addedNodes) {
          $(addedNode).remove();
          console.log("Deleted element:", addedNode);
        }
      }
    }
  });
  var config = { childList: true, subtree: true };
  observer.observe(targetNode, config);
});
