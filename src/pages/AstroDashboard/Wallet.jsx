import React, { useState } from 'react';
import { Wallet, TrendingUp, TrendingDown, Phone, MessageSquare, DollarSign, ArrowUpRight, ArrowDownRight, Calendar, Clock, IndianRupee } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useSelector } from 'react-redux';

function WalletDashboard() {
  const { astrologer } = useSelector((state) => state.astroAuth);
  const { user } = useSelector((state) => state.userAuth)
  const [role, setRole] = useState(localStorage.getItem("role_id"))
  const walletData = (astrologer?.wallet) || (user?.wallet) || {
    balance: "0.00",
    created_at: "2026-01-19T12:19:58.000000Z",
    deleted_at: null,
    id: 30,
    last_recharge_amount: null,
    last_recharge_at: null,
    total_added: "0.00",
    total_call_minutes: 0,
    total_call_spent: "0.00",
    total_chat_minutes: 0,
    total_chat_spent: "0.00",
    total_earned: "0.00",
    total_spent: "0.00",
    total_withdrawn: "0.00",
    updated_at: "2026-01-19T12:19:58.000000Z",
    user_id: 33
  };

  const formatCurrency = (amount) => `₹${parseFloat(amount).toFixed(2)}`;
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const StatCard = ({ icon: Icon, title, value, subtitle, trend, colorClass, borderColor }) => (
    <Card className={`overflow-hidden  ${borderColor} `}>

      <CardContent className=" ">
        <div className="flex items-start justify-between">

          <div>

            <p className="text-sm text-slate-600 mb-1">{title}</p>
            <p className={`text-3xl font-bold ${colorClass}`}>{value}</p>
            {trend && (
              <Badge variant="outline" className="text-xs">
                {trend}
              </Badge>
            )}
          </div>


          <div className={`p-3 rounded-lg ${colorClass} bg-opacity-10`}>
            <Icon className={`w-6 h-6 ${colorClass}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const InfoRow = ({ label, value, icon: Icon }) => (
    <div className="flex items-center justify-between py-3 border-b last:border-0">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        {Icon && <Icon className="w-4 h-4" />}
        <span>{label}</span>
      </div>
      <span className="text-sm font-medium">{value}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <Wallet className="w-8 h-8 text-primary" />
            Wallet Dashboard
          </h1>
          <p className="text-muted-foreground">Track your earnings, spending, and wallet balance</p>
        </div>

        {/* Main Balance Card */}
        <Card className="border-2 border-primary/30 bg-gradient-to-br from-blue-50 to-white">
          <CardContent className="p-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Wallet className="w-4 h-4" />
                <span>Current Balance</span>
              </div>
              <div className="flex items-baseline gap-3">
                <h2 className="text-5xl font-bold text-primary">
                  {formatCurrency(walletData.balance)}
                </h2>
                <Badge variant="outline" className="text-xs">
                  Wallet ID: {walletData.id}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Last Updated</p>
                  <p className="text-sm font-medium">{formatDate(walletData.updated_at)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Account Created</p>
                  <p className="text-sm font-medium">{formatDate(walletData.created_at)}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={TrendingUp}
            title="Total Earned"
            value={formatCurrency(walletData.total_earned)}
            colorClass="text-green-600"
            borderColor={'border-green-200 bg-green-50'}
          />
          <StatCard
            icon={TrendingDown}
            title="Total Withdrawn"
            value={formatCurrency(walletData.total_withdrawn)}
            colorClass="text-orange-600"
            borderColor={'border-orange-200 bg-orange-50'}
          />
          <StatCard
            icon={DollarSign}
            title="Total Added"
            value={formatCurrency(walletData.total_added)}
            colorClass="text-blue-600"
            borderColor={'border-blue-200 bg-blue-50'}
          />
          <StatCard
            icon={ArrowDownRight}
            title="Total Spent"
            value={formatCurrency(walletData.total_spent)}
            colorClass="text-red-600"
            borderColor={'border-red-200 bg-red-50'}
          />
        </div>

        {/* Service Usage */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card className={"border-2 border-green-300"}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-green-600" />
                Call Statistics
              </CardTitle>
              <CardDescription>Your call consultation metrics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-1">
              <InfoRow
                label="Total Call Duration"
                value={`${walletData.total_call_minutes} minutes`}
                icon={Clock}
              />
              <InfoRow
                label="Total Call Revenue"
                value={formatCurrency(walletData.total_call_spent)}
                icon={IndianRupee}
              />
              <InfoRow
                label="Average Per Minute"
                value={walletData.total_call_minutes > 0
                  ? formatCurrency((parseFloat(walletData.total_call_spent) / walletData.total_call_minutes).toFixed(2))
                  : '₹0.00'}
                icon={TrendingUp}
              />
            </CardContent>
          </Card>

          <Card className={"border-2 border-primary/30"}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                Chat Statistics
              </CardTitle>
              <CardDescription>Your chat consultation metrics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-1">
              <InfoRow
                label="Total Chat Duration"
                value={`${walletData.total_chat_minutes} minutes`}
                icon={Clock}
              />
              <InfoRow
                label="Total Chat Revenue"
                value={formatCurrency(walletData.total_chat_spent)}
                icon={IndianRupee}
              />
              <InfoRow
                label="Average Per Minute"
                value={walletData.total_chat_minutes > 0
                  ? formatCurrency((parseFloat(walletData.total_chat_spent) / walletData.total_chat_minutes).toFixed(2))
                  : '₹0.00'}
                icon={TrendingUp}
              />
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className={"border-2 border-primary/30"}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-600" />
              Recent Activity
            </CardTitle>
            <CardDescription>Your latest wallet transactions and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <InfoRow
                label="Last Recharge Amount"
                value={walletData.last_recharge_amount ? formatCurrency(walletData.last_recharge_amount) : 'No recharge yet'}
                icon={ArrowUpRight}
              />
              <InfoRow
                label="Last Recharge Date"
                value={formatDate(walletData.last_recharge_at)}
                icon={Calendar}
              />
            </div>
          </CardContent>
        </Card>

        {/* Summary Card */}
        <Card className={"border-2 border-primary/30"}  >
          <CardHeader>
            <CardTitle>Account Summary</CardTitle>
            <CardDescription>Overview of your wallet account</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Account Status</p>
                <Badge variant="outline" className="text-sm">
                  {walletData.deleted_at ? 'Inactive' : 'Active'}
                </Badge>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">User ID</p>
                <p className="text-sm font-mono">{walletData.user_id}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Wallet ID</p>
                <p className="text-sm font-mono">{walletData.id}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default WalletDashboard;