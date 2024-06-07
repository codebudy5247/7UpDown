import { useState, useEffect } from "react";
import {
  Box,
  Chip,
  Container,
  Typography,
  CircularProgress,
} from "@mui/material";
import Header from "../components/Header";
import { Icon } from "@iconify/react";
import { useAppSelector } from "../redux/hook";
import * as Api from "../services/api";
import LoadingButton from "@mui/lab/LoadingButton";
import CasinoIcon from "@mui/icons-material/Casino";
import { toast } from "react-toastify";

import DiceImage1 from "../assets/Dice1.png";
import DiceImage2 from "../assets/Dice2.png";
import DiceImage3 from "../assets/Dice3.png";
import DiceImage4 from "../assets/Dice4.png";
import DiceImage5 from "../assets/Dice5.png";
import DiceImage6 from "../assets/Dice6.png";

const betTypes = [
  {
    label: "7DOWN",
    value: "7down",
    win: "2x",
  },
  {
    label: "7",
    value: "7",
    win: "5x",
  },
  {
    label: "7UP",
    value: "7up",
    win: "2x",
  },
];

const betAmount = [
  {
    value: "100",
  },
  {
    value: "200",
  },
  {
    value: "500",
  },
];

const Home = () => {
  const diceImages = [
    DiceImage1,
    DiceImage2,
    DiceImage3,
    DiceImage4,
    DiceImage5,
    DiceImage6,
  ];
  const token = useAppSelector(
    (state) => state.authState.accessToken
  ) as string;
  const [user, setUser] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [betType, setBetType] = useState("");
  const [betAmn, setBetAmn] = useState("");

  const [dice1, setDice1] = useState("");
  const [dice2, setDice2] = useState("");

  const [dice1Image, setDice1Image] = useState(diceImages[0]);
  const [dice2Image, setDice2Image] = useState(diceImages[1]);

  const getUser = async () => {
    const [err, res] = await Api.getProfile(token);
    if (err) {
    }
    setUser(res?.data);
  };

  useEffect(() => {
    const init = () => {
      getUser();
    };
    init();
  }, []);

  const placeBet = async () => {
    setLoading(true);
    if (!betAmn && !betType) {
      toast.error("Plz select Bet type and Bet amount.");
    }
    const [err, res] = await Api.rollDice(token, betAmn, betType);
    if (err) {
      toast.error(err?.data?.message);
    }
    if (res) {
      if (res.data.winAmount > 0) {
        toast.success(`You win ${res.data.winAmount} points`);
      } else if (res.data.winAmount < 0) {
        toast.error(`You loose ${res.data.winAmount} points`);
      }
      setDice1(res?.data?.die1);
      setDice2(res?.data?.die2);
      getUser();
      setDice1Image(diceImages[res?.data?.die1 - 1]);
      setDice2Image(diceImages[res?.data?.die2 - 1]);
      setBetType("");
      setBetAmn("");
    }
    setLoading(false);
  };

  return (
    <div>
      <Header />
      <Container component="main" maxWidth="lg">
        <Box
          sx={{
            marginTop: 4,
            marginBottom: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: 3,
            p: 4,
            borderRadius: 4,
          }}
        >
          <Typography variant="h3" sx={{ color: "black", fontWeight: "bold" }}>
            ✨7 UP DOWN✨
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Icon
              icon="fa-solid:coins"
              width="26"
              height="26"
              style={{ color: "yellow" }}
            />
            <Typography
              variant="h6"
              sx={{ color: "black", fontWeight: "bold" }}
            >
              {user?.points}
            </Typography>
          </Box>

          <Box
            sx={{
              marginTop: 1,
              width: "60%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              p: 2,
            }}
          >
            <Typography variant="h4">Select option</Typography>

            <Box sx={{ display: "flex", gap: 4 }}>
              {betTypes.map((betTyp) => (
                <Box
                  onClick={() => setBetType(betTyp.value)}
                  key={betTyp.label}
                  sx={{
                    cursor: "pointer",
                    py: 2,
                    px: 4,
                    mt: 2,
                    borderRadius: 2,
                    bgcolor: "#ff5900",
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "150px",
                    border: betType === betTyp.value ? "2px solid black" : "",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Chip label={betTyp.win} size="medium" color="success" />
                  </Box>
                  <Typography variant="h4" noWrap sx={{ mt: 2 }}>
                    {betTyp.label}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Bet Amount */}
            <Typography variant="h4" sx={{ mt: 4 }}>
              Select Bet Amount
            </Typography>
            <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
              {betAmount.map((amn) => (
                <Box
                  onClick={() => setBetAmn(amn.value)}
                  key={amn.value}
                  sx={{
                    display: "flex",
                    gap: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    border: "1px solid #ff5900",
                    borderRadius: 2,
                    p: 1,
                    cursor: "pointer",
                    bgcolor: betAmn === amn.value ? "#ff5900" : "",
                  }}
                >
                  <Icon
                    icon="fa-solid:coins"
                    width="26"
                    height="26"
                    style={{ color: "yellow" }}
                  />
                  <Typography
                    variant="h6"
                    sx={{ color: "black", fontWeight: "bold" }}
                  >
                    {amn.value}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Dice */}
            <Box
              sx={{
                p: 3,
                mt: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box sx={{ display: "flex", gap: 2, mb: 1 }}>
                <img
                  src={dice1Image}
                  style={{ height: "150px", width: "150px" }}
                ></img>
                <img
                  src={dice2Image}
                  style={{ height: "150px", width: "150px" }}
                ></img>
              </Box>
              {loading ? (
                <CircularProgress />
              ) : (
                <Typography
                  variant="h6"
                  sx={{ color: "black", fontWeight: "bold" }}
                >
                  {dice1 + dice2}
                </Typography>
              )}
            </Box>

            <LoadingButton
              loading={loading}
              loadingPosition="start"
              startIcon={<CasinoIcon />}
              variant="outlined"
              onClick={placeBet}
              sx={{ mt: 2 }}
            >
              Roll Dice
            </LoadingButton>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Home;
