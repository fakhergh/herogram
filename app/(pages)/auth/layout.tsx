"use client";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

import { Routes } from "@/app/config/navigation";

const StyledContainer = styled(Container)({
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const StyledContent = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: -10,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

export default function AuthLayout({ children }: { children: ReactNode }) {
  const { replace } = useRouter();

  useEffect(() => {
    console.log(localStorage.getItem("token"));
    if (localStorage.getItem("token")) {
      replace(Routes.home);
    }
  }, [replace]);

  return (
    <StyledContainer maxWidth="sm">
      <StyledContent>{children}</StyledContent>
    </StyledContainer>
  );
}
