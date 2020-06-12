import React, { useImperativeHandle, forwardRef, useState } from "react";
import crypto from "crypto";

import { FiCheckCircle } from "react-icons/fi";

import { Container } from "./styles";

type NotificationType = "SUCCESS" | "INFO" | "DANGER";

interface NotificationRefProps {
  notify: (title: string, type: NotificationType, duration: number) => void;
}

interface NotificationData {
  id: string;
  title: string;
  type: NotificationType;
}

const Notification: React.ForwardRefRenderFunction<NotificationRefProps, {}> = (
  props,
  ref
) => {
  const [notifications, setNotification] = useState<NotificationData[]>([]);
  function notify(title: string, type: NotificationType, duration = 1000) {
    const newNotification: NotificationData = {
      id: crypto.randomBytes(8).toString(),
      title,
      type,
    };

    setNotification((oldNotifications) => [
      ...oldNotifications,
      newNotification,
    ]);
  }

  useImperativeHandle(ref, () => ({
    notify,
  }));

  return (
    <Container>
      <ul>
        {notifications.map((notification) => (
          <li key={notification.id} className="notification">
            <FiCheckCircle color="#0F0" size={20} />
            <p>You logged with successful</p>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default forwardRef(Notification);
