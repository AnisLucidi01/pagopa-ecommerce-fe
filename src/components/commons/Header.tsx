/* eslint-disable sonarjs/cognitive-complexity */
import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import { HelpOutlineOutlined, ShoppingCart } from "@mui/icons-material";
import pagopaLogo from "../../assets/images/pagopa-logo.svg";
import {
  Cart,
  PaymentInfo,
  PaymentNotice,
} from "../../features/payment/models/paymentModel";
import { CheckoutRoutes } from "../../routes/models/routeModel";
import {
  getSessionItem,
  SessionItems,
} from "../../utils/storage/sessionStorage";
import { moneyFormat } from "../../utils/form/formatters";
import { paymentSubjectTransform } from "../../utils/transformers/paymentTransformers";
import DrawerDetail from "../Header/DrawerDetail";

export default function Header() {
  const location = useLocation();
  const currentPath = location.pathname.split("/").slice(-1)[0];
  const paymentInfoData = getSessionItem(SessionItems.paymentInfo) as
    | PaymentInfo
    | undefined;
  const PaymentInfo = {
    receiver: paymentInfoData?.paName || "",
    subject: paymentSubjectTransform(paymentInfoData?.description) || "",
    amount: paymentInfoData?.amount || 0,
  };
  const CartInfo = getSessionItem(SessionItems.cart) as Cart | undefined;
  const [drawstate, setDrawstate] = React.useState(false);
  const ignoreRoutes: Array<string> = [
    CheckoutRoutes.ROOT,
    CheckoutRoutes.ERRORE,
    CheckoutRoutes.ESITO,
  ];
  const toggleDrawer = (open: boolean) => {
    setDrawstate(open);
  };
  const paymentNotices: Array<PaymentNotice> = CartInfo
    ? CartInfo.paymentNotices
    : [
        {
          noticeNumber: paymentInfoData?.rptId
            ? paymentInfoData?.rptId.slice(11)
            : "",
          fiscalCode: paymentInfoData?.paFiscalCode || "",
          amount: paymentInfoData?.amount || 0,
          companyName: paymentInfoData?.paName || "",
          description: paymentInfoData?.description || "",
        },
      ];

  return (
    <Box p={3} bgcolor={"white"}>
      <Grid container spacing={0}>
        <Grid item xs={2} display="flex" alignItems="center">
          <img
            src={pagopaLogo}
            alt="pagoPA"
            style={{ width: "56px", height: "36px" }}
            aria-hidden="true"
          />
        </Grid>
        {(!!PaymentInfo.receiver || !!CartInfo?.paymentNotices) &&
          !ignoreRoutes.includes(currentPath) && (
            <>
              <Grid
                item
                xs={10}
                display="flex"
                alignItems="center"
                justifyContent="flex-end"
                sx={{ cursor: "pointer" }}
              >
                <Typography
                  color="primary.main"
                  variant="body2"
                  component="div"
                  fontWeight={600}
                  display="flex"
                  alignItems="center"
                  justifyContent="flex-end"
                  onClick={() => toggleDrawer(true)}
                >
                  <HelpOutlineOutlined color="primary" sx={{ ml: 2 }} />
                </Typography>
              </Grid>
            </>
          )}
      </Grid>
    </Box>
  );
}
