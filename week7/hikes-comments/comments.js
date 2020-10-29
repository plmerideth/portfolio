import {readLocalStorage, writeLocalStorage} from './ls.js';
import teamHikes from './main.js';

export default class Comments
{
  constructor(type, commentElementId)
  {
    this.type = type;
    this.commentElementId = commentElementId;
    this.model = new CommentModel(this.type);
  }

  addSubmitListener(postName)
  {
    // use element.onclick to avoid more than one listener getting attached at a time to the button.
    //If element.addEventListener() allows unlimited events to be attached to one element.  onclick allows only one.
    document.getElementById('commentSubmit').onclick = () =>
    {
      // debugger;
      this.model.addComment( postName, document.getElementById('commentEntry').value);
      //Clear out input field after comment has been added.
      document.getElementById('commentEntry').value = '';
      this.showCommentList(postName);
    };

    //Add cancel button
    document.getElementById('commentCancel').onclick = () =>
    {
      document.getElementById('commentEntry').value = '';
      //this.showCommentList(postName);
      teamHikes.showHikeList();
    };
  }

  showCommentList(q = null)
  {
    const parent = document.getElementById(this.commentElementId);
    // check to see if the commentUI code has been added yet
    if (parent.innerHTML === '')
    {
      parent.innerHTML = commentUI;
    }
    if (q !== null) {
      // looking at one post, show comments and new comment button by making display mode = block
      document.querySelector('.addComment').style.display = 'block';
      this.addSubmitListener(q);
    } else {
      // no hike selected, hide comment entry
      document.querySelector('.addComment').style.display = 'none';
    }

    //Read comments from LS
    // get the comments from the model
    let comments = this.model.getComments(q);
    if (comments === null) {
      // avoid an error if there are no comments yet.
      comments = [];
    }
    renderCommentList(parent.lastChild, comments);
    //Give comment box focus
    document.getElementById('commentEntry').focus();
  }
} //End Comments Class

class CommentModel
{
  constructor(type)
  {
    this.type = type;
    // get the initial list of comments out of local storage if it exists
    //If comments don't exist, assign empty array
    this.comments = JSON.parse(readLocalStorage(this.type)) || [];
  }

  getComments(q = null)
  {
    if (q === null)
    {
      // no query, get all comments of the type
      return this.comments;
    }
    else
    {
      // comments for a specific post...filter by name
      return this.comments.filter(el => el.name === q);
    }
  }

  addComment(postName, comment)
  {
    const newComment =
    {
      name: postName,
      comment: comment,
      date: getTimeStamp()
    };
    this.comments.push(newComment);
    writeLocalStorage(this.type, this.comments);
  }
} //End of CommentModel Class


function renderCommentList(element, comments)
{
  // clear out any comments that might be listed
  element.innerHTML = '';
  // add the new list of comments
  comments.forEach(el =>
  {
    let item = document.createElement('li');
    item.innerHTML = `
            <strong>${el.name}:</strong> ${el.comment}<br>
            <strong>Submitted: </strong>${el.date}<br><br>

      `;
      element.appendChild(item);
  });
}

function getTimeStamp()
{
  let now = new Date();
  let dateTimeOpt =
  {
    weekday: "short",
    month: "short",
    year: "numeric",
    day: "numeric"
  }
  let formattedTime = Intl.DateTimeFormat("en-US", dateTimeOpt).format(now)
  return formattedTime;
}

const commentUI = `<div class="addComment">
<h2>Add a comment</h2>
<input type="text" id="commentEntry" class="inputBox" />
<button id="commentSubmit" class="commentButton">Submit</button>
<button id="commentCancel" class="commentButton">Cancel</button>
</div>
<h2>Comments</h2>
<ul class="comments"></ul>`;
