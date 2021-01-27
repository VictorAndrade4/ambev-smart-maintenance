import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import ModalEquipaments from "../Modal/ModalEquipaments";
import { Check } from '../../types';

interface Data {
  name: string | undefined;
  Realizados: string | undefined;
  "Não Realizados": string | undefined;
}

interface states{
  open:boolean;
}

class BarGraphic extends PureComponent<{ data: Data[], modal: Check[] | null, kind:String },states> {
  constructor(props:any) {
    super(props);
    this.state = {
      open: false
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
    handleOpen() {
        this.setState({open:true})
    }
    handleClose() {
        this.setState({open:false})
    }

  render() {
    const { data } = this.props;
    const openModal = this.state.open;
    return (
      <>
        <ModalEquipaments open={openModal} close={this.handleClose} data={this.props.modal} kind={this.props.kind} />
        <ResponsiveContainer width="100%" height="100%" aspect={1.25}>
          <BarChart  data={data} onClick={this.handleOpen}>
            <XAxis dataKey="name" />
            <YAxis domain={[0,100]}/>
            <Tooltip offset={0} isAnimationActive={false} />
            <Legend />
            <Bar barSize={70} dataKey="Realizados" fill="#008744" />
            <Bar barSize={70} dataKey="Não Realizados" fill="#d62d20" />
          </BarChart>
        </ResponsiveContainer>
      </>
    );
  }
}
export default BarGraphic;