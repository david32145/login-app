import React, { useImperativeHandle, forwardRef, useState } from "react";
import crypto from "crypto";

import { FiCheckCircle, FiInfo, FiAlertCircle } from "react-icons/fi";

import { Container } from "./styles";

export type NotificationType = "SUCCESS" | "INFO" | "DANGER";

export interface NotificationRefProps {
  notify: (title: string, type: NotificationType, duration: number) => void;
}

interface NotificationData {
  id: string;
  title: string;
  type: NotificationType;
}

function getColorByType(type: NotificationType): string {
  switch (type) {
    case "SUCCESS":
      return "#0F0";
    case "INFO":
      return "#00F";
    case "DANGER":
      return "#F00";
    default:
      return "#000";
  }
}

const Icon: React.FC<{ type: NotificationType; color: string }> = ({
  type,
  color,
}) => {
  switch (type) {
    case "SUCCESS":
      return <FiCheckCircle color={color} size={20} />;
    case "INFO":
      return <FiInfo color={color} size={20} />;
    case "DANGER":
      return <FiAlertCircle color={color} size={20} />;
    default:
      return <FiCheckCircle color={color} size={20} />;
  }
};

const Notification: React.ForwardRefRenderFunction<NotificationRefProps, {}> = (
  props,
  ref
) => {
  const [notifications, setNotification] = useState<NotificationData[]>([]);
  function notify(title: string, type: NotificationType, duration = 5000) {
    const newNotification: NotificationData = {
      id: crypto.randomBytes(8).toString(),
      title,
      type,
    };

    setTimeout(() => {
      setNotification((oldNotification) =>
        oldNotification.filter(
          (notification) => notification.id !== newNotification.id
        )
      );
    }, duration);

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
            <Icon
              type={notification.type}
              color={getColorByType(notification.type)}
            />
            <p>{notification.title}</p>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default forwardRef(Notification);
