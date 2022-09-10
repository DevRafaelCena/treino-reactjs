import styles from './Comment.module.css'
import { ThumbsUp, Trash } from 'phosphor-react';

export function Comment(){
    return (
        <div className={styles.comment}>
            <img src="https://avatars.githubusercontent.com/u/16430369?v=4" alt='' />

            <div className={styles.commentBox}>
                <div className={styles.commentContent}>
                    <header>
                        <div className={styles.authorAndTime}>
                            <strong>Rafael Cena</strong>
                            <time title='11 de Maio as 15:00h' dateTime='2022-05-11 10:00:00'>Cerca de 1h atrás</time>
                        </div>
                        <button title='Deletar comentário'>
                            <Trash size={24} />
                        </button>
                    </header>
                    <p>Parabenssssss</p>
                </div>

                <footer>
                    <ThumbsUp />
                    Aplaudir <span>20</span>
                </footer>
            </div>
        </div>
    )
}