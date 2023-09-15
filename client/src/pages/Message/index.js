import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../../components/Avatar';
import Navbar from '../../components/Navbar';
import "./index.scss";

function Message() {
  return (
    <div className='message'>
      <Navbar />
      <div className='message--container w-100 h-100'>
        <div className='message--container__left p-2 d-flex flex-column'>
          <div className='listChat--head d-flex flex-row align-items-center justify-content-between'>
            <h3>Chat</h3>

            <div className='listChat--head__action d-flex flex-row align-items-center justify-content-between'>
              <div className='action--item item'>
                <span className="material-icons">
                  more_horiz
                </span>
              </div>
              <div className='action--item item'>
                <span className="material-icons">
                  edit_note
                </span>
              </div>
            </div>
          </div>

          <div className='listChat--content'>
            <div className='listChat--item p-2 d-flex align-items-center rounded-3'>
              <div className='listChat--item__avatar'>
                <Avatar src="https://media.viez.vn/prod/2021/7/18/large_127022376_1216247905494609_2085492743987489760_n_b165011ebe.jpg" size="small-56" />
              </div>

              <div className='listChat--item__info'>
                <p className='listChat--user fw-bold text-black'>User1</p>
                <p className='listChat--lastMess text-black-50'>
                  User1
                  <span>  ~ 9 giờ</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className='message--container__content p-2 d-flex flex-column'>
          <div className='message--content__head d-flex align-items-center justify-content-between w-100'>
            <Link to="/" className='message--content__user d-flex align-items-center px-2 py-1 rounded-3'>
              <div className='message--user__avatar'>
                <Avatar src="https://media.viez.vn/prod/2021/7/18/large_127022376_1216247905494609_2085492743987489760_n_b165011ebe.jpg" size="small-40" />
              </div>

              <div className='message--user__info'>
                <p className='message--user fw-bold text-black'>User1</p>
                <p className='message--lastActive text-black-50'>
                  User1
                </p>
              </div>
            </Link>

            <ul className='message--content__action d-flex align-items-center justify-content-center'>
              <li className='action--item'>
                <span className="material-icons text-primary">
                  phone
                </span>
              </li>
              <li className='action--item text-primary'>
                <span className="material-icons">
                  video_call
                </span>
              </li>
              <li className='action--item text-primary'>
                <span className="material-icons">
                  info
                </span>
              </li>
            </ul>
          </div>

          <div className='message--content__chatview d-flex flex-column'>
            <div className='message--recipient d-flex justify-content-start align-items-center p-2'>
              <Avatar src="https://kynguyenlamdep.com/wp-content/uploads/2022/06/anh-gai-xinh-cuc-dep.jpg" size="small-32" />

              <div className='message--text message--text__recipient'>
                <p>Hello anh em</p>
              </div>
            </div>
            <div className='message--sender d-flex justify-content-end align-items-center p-2'>
              <div className='message--text message--text__sender'>
                <p>Hello ban</p>
              </div>
            </div>
          </div>

          <div className='message--content__footer d-flex align-items-center justify-content-between'>
            <ul className='message--chat__action d-flex align-items-center'>
              <li className='action--chat__item item'>
                <span className="material-icons text-primary">
                  collections
                </span>
              </li>
              <li className='action--chat__item item'>
                <span className="material-icons text-primary">
                  gif
                </span>
              </li>
            </ul>
            <div className='message--chat__input w-100 d-flex align-items-center rounded-5 px-3 py-1 mx-2'>
              <input className='chat--text' />
              <div className='chat--emoji item'>
                <span className="material-icons text-primary">
                  mood
                </span>
              </div>
            </div>

            <div className='message--chat__send d-flex align-items-center rounded-circle item'>
              <span className="material-icons text-primary">
                send
              </span>
            </div>
          </div>
        </div>
        <div className='message--container__right p-2 d-flex flex-column'>
          <div className='message--info__head w-100 d-flex flex-column align-items-center p-2'>
            <Avatar src="https://kynguyenlamdep.com/wp-content/uploads/2022/06/anh-gai-xinh-cuc-dep.jpg" size="big" />

            <div className='message--user__info my-2'>
              <p className='message--user fw-bold text-black'>User1</p>
              <p className='message--lastActive text-black-50'>
                User1
              </p>
            </div>

            <ul className='message--user__action d-flex flex-row justify-content-between py-3 px-2'>
              <li className='action--user__item'>
                <div className='item'>
                  <span className="material-icons">
                    account_circle
                  </span>
                </div>
                <p>Trang cá nhân</p>
              </li>
              <li className='action--user__item'>
                <div className='item'>
                  <span className="material-icons">
                    notifications
                  </span>
                </div>
                <p>Tắt thông báo</p>
              </li>
              <li className='action--user__item'>
                <div className='item'>
                  <span className="material-icons">
                    search
                  </span>
                </div>
                <p>Tìm kiếm tin nhắn</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Message