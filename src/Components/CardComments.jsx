import React from "react";

function CardComments({ DataComments }) {
  return (
    <ul role="list" className="divide-y divide-gray-100 m-2">
      <li className="flex justify-between gap-x-6 py-5">
        <div className="flex min-w-0 gap-x-4">
          <img
            className="h-12 w-12 flex-none rounded-full bg-gray-50"
            src={`https://xsgames.co/randomusers/assets/avatars/male/${DataComments.id}.jpg`}
            alt="profile image"
          />
          <div className="min-w-0 flex-auto">
            <p className="text-sm font-semibold leading-6 text-gray-900">
              {DataComments.name}
            </p>
            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
              {DataComments.email}
            </p>
            <p className="text-sm leading-6 text-gray-900">
              {DataComments.body}
            </p>
          </div>
        </div>
      </li>
    </ul>
  );
}

export default CardComments;
