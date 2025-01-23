import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Debug } from '../utils/debug';
import { useCart } from '../contexts/CartContext';
import { PhoneForm } from '../components/verification/PhoneForm';
import { CodeForm } from '../components/verification/CodeForm';
import { initiateVerification, completeVerification } from '../services/verification/process';
import { getCustomerSession } from '../services/auth/customer';
import { createOrder } from '../utils/orders';
import toast from 'react-hot-toast';

// Rest of the file remains the same