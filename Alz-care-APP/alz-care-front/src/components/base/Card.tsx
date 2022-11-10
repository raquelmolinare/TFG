import React from "react";

interface CardProps {
  /**
   * Card title
   */
  title: string;

  /**
   * Card icon Title
   */
  iconTitle?: React.ReactNode;

  /**
   * Fragment rendered in the body section of the card
   */
  body: React.ReactNode;

  /**
   * Fragment rendered in the bottom section of the card
   */
  bottom?: React.ReactNode;
}

export function Card({ title, iconTitle, body, bottom }: CardProps) {
  return (
    <div className="card h-100">
      <div className="card-body p-4">
          <div className="row mb-4">
            <div className="col col-2">
              {iconTitle && <div className="icon-title">{iconTitle}</div>}
            </div>
            <div className="col col-8 align-self-center text-start">
              <span className="card-title">{title}</span>
              </div>
          </div>
        <div>{body}</div>
        {bottom && <div>{bottom}</div>}
      </div>
    </div>
  );
}
