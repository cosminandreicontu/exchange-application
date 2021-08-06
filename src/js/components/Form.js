import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const TEXT = [
    {
        action: "BUY",
        secondAction: "PAY WITH",
        subtitle: "CURRENT RATE",
    },
    {
        action: "SELL",
        secondAction: "FOR",
        subtitle: "CURRENT RATE",
    },
    {
        action: "SEND",
        secondAction: "",
        subtitle: "WALLET ADDRESS",
    },
];

const RATES = {
    "USD/USD": 1,
    "USD/EUR": 0.82,
    "USD/GBP": 0.7,
    "EUR/USD": 1.22,
    "EUR/EUR": 1,
    "EUR/GBP": 0.86,
    "GBP/USD": 1.42,
    "GBP/EUR": 1.16,
    "GBP/GBP": 1,
}

export default function Form({ index }) {
  const classes = useStyles();
  const [firstCurrency, setFirstCurrency] = React.useState('');
  const [secondCurrency, setSecondCurrency] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const [address, setAddress] = React.useState('');

  const handleClick = index => {
      let payload = {};
      if (index == 2) {
          payload = {
            instrumentSymbol: firstCurrency,
            quantity: parseInt(amount),
            destinationWalletAddress: address,
          };
      } else {
        payload = {
            instrumentSymbol: `${firstCurrency}/${secondCurrency}`,
            quantity: parseInt(amount),
            conversionType: TEXT[index].action,
            rate: parseInt(RATES[`${firstCurrency}/${secondCurrency}`])
        };
      }
      console.log({payload})
  }

  return (
    <div className={classes.root}>
        <Typography variant="h6" gutterBottom>
            {TEXT[index].action}
        </Typography>
        <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">{TEXT[index].action}</InputLabel>
            <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={firstCurrency}
            onChange={e => setFirstCurrency(e.target.value)}
            >
            <MenuItem value={'USD'}>USD</MenuItem>
            <MenuItem value={'EUR'}>EUR</MenuItem>
            <MenuItem value={'GBP'}>GBP</MenuItem>
            </Select>
        </FormControl>
        {index !== 2 &&
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">{TEXT[index].secondAction}</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={secondCurrency}
                onChange={e => setSecondCurrency(e.target.value)}
                >
                <MenuItem value={'USD'}>USD</MenuItem>
                <MenuItem value={'EUR'}>EUR</MenuItem>
                <MenuItem value={'GBP'}>GBP</MenuItem>
                </Select>
            </FormControl>
        }
        <FormControl className={classes.formControl}>
            <TextField id="standard-basic" type="number" label="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
        </FormControl>
        {index === 2 ?
            <FormControl className={classes.formControl}>
                <TextField id="standard-basic" label={TEXT[index].subtitle} value={address} onChange={e => setAddress(e.target.value)} />
            </FormControl>
        :
            <Typography variant="body1" gutterBottom>
                {`${TEXT[index].subtitle}: ${RATES[`${firstCurrency}/${secondCurrency}`] ? RATES[`${firstCurrency}/${secondCurrency}`] : 'N/A'}`}
            </Typography>
        }  
        <Button variant="contained" color="primary" onClick={() => handleClick(index)}>
            {TEXT[index].action}
        </Button>
    </div>
  );
}
