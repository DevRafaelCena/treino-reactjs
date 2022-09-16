import styles from './Post.module.css'
import { Avatar } from './Avatar';
import { Comment } from './Comment';
import {format , formatDistanceToNow, set} from 'date-fns'
import ptBr from 'date-fns/locale/pt-BR'
import { useState } from 'react';


export function Post({author,publishedAt,content}) {

    const [comments, setComments] = useState(['post muito legal!!!'])
    const [newCommentsText, setNewCommentText] = useState('')

    const plublishedDateFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm 'h'",{
      locale: ptBr
    })

    const publishedDateRelativetoNow = formatDistanceToNow(publishedAt,{
      locale: ptBr,
      addSuffix: true
    })

  

    function handleCreateNewComment(){
      event.preventDefault()
     
      setComments([...comments,newCommentsText])

      setNewCommentText('')

    }

    function handleNewCommentChance(){
      event.target.setCustomValidity("")
      setNewCommentText(event.target.value)
    }

    function deleComment(commentToDelete){

      const commentsWithoutDeletedOne = comments.filter(comment => {
        return comment !== commentToDelete
      })


        setComments(commentsWithoutDeletedOne)
    }

    function handleNewCommentInvalid(){
      event.target.setCustomValidity("Esse campo é obrigatório")
    }

    const isNewCommentEmpty = newCommentsText.length === 0

    return (
     <article className={styles.post}>
      <header>
          <div className={styles.author}>
          <Avatar src={author.avatarUrl}/>

            <div className={styles.authorInfo}>
              <strong>{author.name}</strong>
              <span>{author.role}</span>
            </div>
            
          </div>

          <time title={plublishedDateFormatted} dateTime={publishedAt.toISOString()} >
            {publishedDateRelativetoNow}
          </time>

      </header>

      <div className={styles.content}>
         {content.map(line => {
            if(line.type === 'paragraph'){
              return <p key={line.content}>{line.content}</p>
            }else if(line.type ==='link'){
              return <p key={line.content}><a href='#' >{line.content}</a></p>
            }
         })}
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea 
          name="comment"
          placeholder='Deixe um comentário'
          onChange={handleNewCommentChance}
          value={newCommentsText}
          onInvalid={handleNewCommentInvalid}
          required
        />

        <footer>
          <button 
            type='submit'
            disabled={isNewCommentEmpty}
            >
            Publicar
          </button>
        </footer>
       

      </form>

      <div className={styles.commentList}>
         {comments.map(comment => {
              return <Comment onDeleteComment={deleComment} key={comment}  content={comment} />
         })}
      </div>

     </article>
    )
  }