import { useState, useEffect, useRef } from 'react';

import style from './commentsPanel.module.scss';

import { Comment, CommentNew, CommentsTypes } from '../';

export default function CommentsPanel() {

    const commentPanelRef = useRef(null);

    const [comments, setComments] = useState<CommentsTypes.commentType[]>([]),
        [shouldDisplayNewComment, setShouldDisplayNewComment] = useState(false);

    const updateComments = (comment: CommentsTypes.commentType) => {
        const newComments = comments.slice();
        newComments.push(comment);
        setComments(newComments);
        console.log(newComments);
    }

    const testShouldDisplayNewComment = () => {
        const rect = commentPanelRef.current.getBoundingClientRect();

        if (rect.y < window.innerHeight) {
            setShouldDisplayNewComment(true);
        } else {
            setShouldDisplayNewComment(false);
        }
    }

    useEffect(() => {
        document.addEventListener("scroll", testShouldDisplayNewComment);
        return () => {
            document.removeEventListener("scroll", testShouldDisplayNewComment);
        }
    }, [])



    return (
        <div className={style.comments_panel} ref={commentPanelRef}>
            <div className={style.title}>
                Comments
            </div>
            {
                comments !== null && comments.length > 0
                    ? comments.map((comment) => {
                        return (
                            <div className={style.content} key={comment.content}>
                                <Comment comment={comment} />
                            </div>
                        )
                    })
                    : <div className={style.empty}>
                        No comments yet.
                     </div>      
            }
            <div className={style.new_comment} style={{ bottom: shouldDisplayNewComment ? "0" : "-600px" }}>
                <CommentNew isMain={true} feedBack={updateComments} />
            </div>
        </div>
    );
}


const fakeImages = [
    { src: "/images/one_man_standing.jpg" },
    { src: "/images/one_man_walking.jpg" },
    { src: "/images/top_page_bg.jpg" },
    { src: "/images/one_man_walking_large_landscape.jpg" },
    { src: "/images/one_man_standing.jpg" },
    { src: "/images/one_man_walking.jpg" },
    { src: "/images/top_page_bg.jpg" },
    { src: "/images/one_man_walking_large_landscape.jpg" },
    { src: "/images/one_man_standing.jpg" },
    { src: "/images/one_man_walking.jpg" },
    { src: "/images/top_page_bg.jpg" },
    { src: "/images/one_man_walking_large_landscape.jpg" },
    { src: "/images/one_man_standing.jpg" },
    { src: "/images/one_man_walking.jpg" },
    { src: "/images/top_page_bg.jpg" },
]

const fakeAnswers = [
    {
        name: "Cao",
        role: "Lightspeed Rider",
        avatar: "/images/profile.jpg",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br/>Nam in ipsum odio. Cras erat tortor, consequat sit amet leo in, pretium laoreet ex. In congue nisl porta risus volutpat, in accumsan sapien sodales. Cras mollis sem leo, eget aliquam tellus varius vel. Vestibulum non justo maximus leo laoreet sollicitudin et sed elit. Fusce eu leo nibh. Proin facilisis justo ipsum. <br/>Curabitur et ante eget justo semper feugiat nec a velit. Fusce mattis tincidunt metus, a molestie massa feugiat vel. ",
        attachments: [],
        likes: 0,
    },
    {
        name: "Cao",
        role: "Idiot",
        avatar: "",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br/>Nam in ipsum odio. Cras erat tortor, consequat sit amet leo in, pretium laoreet ex. <br/>In congue nisl porta risus volutpat, in accumsan sapien sodales. Cras mollis sem leo, eget aliquam tellus varius vel. <br/>Vestibulum non justo maximus leo laoreet sollicitudin et sed elit. Fusce eu leo nibh. Proin facilisis justo ipsum. <br/>Curabitur et ante eget justo semper feugiat nec a velit. Fusce mattis tincidunt metus, a molestie massa feugiat vel. ",
        attachments: fakeImages,
        likes: 0,
    },
    {
        name: "Cao",
        role: "Lightspeed Rider",
        avatar: "/images/profile.jpg",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br/>Nam in ipsum odio. Cras erat tortor, consequat sit amet leo in, pretium laoreet ex. <br/>In congue nisl porta risus volutpat, in accumsan sapien sodales. Cras mollis sem leo, eget aliquam tellus varius vel. <br/>Vestibulum non justo maximus leo laoreet sollicitudin et sed elit. Fusce eu leo nibh. Proin facilisis justo ipsum. <br/>Curabitur et ante eget justo semper feugiat nec a velit. Fusce mattis tincidunt metus, a molestie massa feugiat vel. ",
        attachments: fakeImages,
        likes: 0,
    },
]

const fakeComment = {
    user: {
        name: "Cao",
        avatar: "/images/profile.jpg",
        role: "Lightspeed rider"
    },
    content: "Je prends le temps d'écrire ? non ahah <br/>Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br/>Nam in ipsum odio. Cras erat tortor, consequat sit amet leo in, pretium laoreet ex. In congue nisl porta risus volutpat, in accumsan sapien sodales. Cras mollis sem leo, eget aliquam tellus varius vel. Vestibulum non justo maximus leo laoreet sollicitudin et sed elit. Fusce eu leo nibh. Proin facilisis justo ipsum. <br/>Curabitur et ante eget justo semper feugiat nec a velit. Fusce mattis tincidunt metus, a molestie massa feugiat vel. ",
    attachments: fakeImages,
    answers: fakeAnswers,
    likesCount: 10,
}

let fakeComments = [
    fakeComment,
]




