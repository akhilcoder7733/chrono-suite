import React from "react";
import { styled } from "@mui/system";
import { Box, Typography, IconButton } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import useNotification from "../../app/notifications/useNotification";

const Overlay = styled(motion.div)(({ theme }) => ({
  position: "fixed",
  inset: 0,
  backdropFilter: "blur(6px)",
  background: "rgba(0,0,0,0.3)",
  zIndex: 1500,
}));

const Panel = styled(motion.div)(({ theme }) => ({
  position: "fixed",
  right: 0,
  top: 0,
  height: "100dvh",
  overflowY: "auto",
  width: 360,
  padding: 24,
  backdropFilter: "blur(30px)",
  background: `${theme.palette.background.paper}ee`,
  borderLeft: `1px solid ${theme.palette.divider}`,
  zIndex: 1600,
}));

const NotificationCard = styled(motion.div)(({ theme, read }) => ({
  padding: 16,
  borderRadius: 18,
  marginBottom: 16,
  backdropFilter: "blur(20px)",
  background: read
    ? theme.palette.action.hover
    : `${theme.palette.primary.main}15`,
  border: `1px solid ${theme.palette.divider}`,
}));

const NotificationDrawer = ({ open, onClose }) => {
  const { notifications, markAsRead, clearAll } = useNotification();

  return (
    <AnimatePresence>
      {open && (
        <>
          <Overlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <Panel
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 28,
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={3}
            >
              <Typography variant="h6">Notifications</Typography>

              <IconButton onClick={onClose}>
                <CloseIcon />
              </IconButton>
            </Box>

            {notifications.length === 0 && (
              <Typography variant="body2" sx={{ opacity: 0.6 }}>
                No notifications yet.
              </Typography>
            )}

            {notifications.map((n) => (
              <NotificationCard
                key={n.id}
                read={n.read}
                whileHover={{ scale: 1.03 }}
                onClick={() => markAsRead(n.id)}
              >
                <Typography fontWeight={600}>{n.title}</Typography>
                <Typography variant="body2" sx={{ mt: 0.5 }}>
                  {n.message}
                </Typography>
              </NotificationCard>
            ))}

            {notifications.length > 0 && (
              <Typography
                variant="body2"
                sx={{ mt: 3, cursor: "pointer", opacity: 0.6 }}
                onClick={clearAll}
              >
                Clear All
              </Typography>
            )}
          </Panel>
        </>
      )}
    </AnimatePresence>
  );
};

export default NotificationDrawer;
