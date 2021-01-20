import React from 'react';

export default function () {
  return (
    <div className="user-menu">
      <div className="user-info">
        <div
          className="profile-img"
          style={{
            backgroundImage:
              'url(https://s3.amazonaws.com/uifaces/faces/twitter/mlane/128.jpg)',
          }}
        />
        <h3 className="name">Hugo Fonseca</h3>
        <div className="ui btn normal">Perfil</div>
      </div>
      <div className="invites-info">
        <span>
          Next invite in <i>40 days</i>
        </span>
        <div className="next-invite-bar">
          <div className="progress" style={{ width: '70%' }} />
        </div>
        <p>You have 2 invites</p>
        <div className="ui btn normal">INVITE</div>
      </div>
      <div className="menu-nav">
        <li>
          <span className="fa fa-tachometer" />
          Panel
        </li>
        <li>
          <span className="fa fa-cogs" />
          Settings
        </li>
        <li>
          <span className="fa fa-question" />
          Help
        </li>
        <li>
          <span className="fa fa-power-off" />
          Sign Out
        </li>
      </div>
    </div>
  );
}
