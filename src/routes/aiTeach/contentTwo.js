import React from 'react'
import { prefix } from 'utils/config'
import { Page } from 'firebrand-component'
import { Anchor,Table } from 'antd';
const { Link } = Anchor;

class ContentTwo extends React.Component {
  state={
    href:"21"
  }
  // renderMenuItem=(date)=>{
  //   return  date.map((item)=>{
  //     return (
  //       <Link href={"#"+item.key} title={item.val}/>
  //     )
  //   })
  // }
  clickit=(e)=>{//Anchor有问题先自己定义
    // let href=e.target.getAttribute("href");
    // this.props.dispatch({
    //   type:"aiTeach/setHref",
    //   payload:{href:href}
    // })
    let href=e.target.getAttribute("href_");
    if(href!=null){
      let div_arr=document.getElementsByClassName('ant-anchor-link');
      let num=href-21;
      for(let a=0;a<9;a++){
        div_arr[a].setAttribute("class", "ant-anchor-link");
      }
      div_arr[num].setAttribute("class", "ant-anchor-link ant-anchor-link-active");
      document.getElementsByClassName("eastcom-main")[0].scrollTop=(document.getElementById(href).offsetTop+50);
      this.setState({href:href})
    }
  }
  componentDidMount(){
    let div_arr=document.getElementsByClassName('ant-anchor-link');
    let num=this.state.href-21;
    div_arr[num].setAttribute("class", "ant-anchor-link ant-anchor-link-active");
    let mythis=this;
    document.getElementsByClassName("eastcom-main")[0].addEventListener('scroll',function (e) {
      let id21=document.getElementById("21").offsetTop+50;
      let id22=document.getElementById("22").offsetTop+50;
      let id23=document.getElementById("23").offsetTop+50;
      let id24=document.getElementById("24").offsetTop+50;
      let id25=document.getElementById("25").offsetTop+50;
      let id26=document.getElementById("26").offsetTop+50;
      let id27=document.getElementById("27").offsetTop+50;
      let id28=document.getElementById("28").offsetTop+50;
      let id29=document.getElementById("29").offsetTop+50;
      let href="21";
      let now=e.target.scrollTop;
      if(now>=id29){
        href="29";
      }
      if(now<id29){
        href="28";
      }
      if(now<id28){
        href="27";
      }
      if(now<id27){
        href="26";
      }
      if(now<id26){
        href="25";
      }
      if(now<id25){
        href="24";
      }
      if(now<id24){
        href="23";
      }
      if(now<id23){
        href="22";
      }
      if(now<id22){
        href="21";
      }
      if(mythis.state.href!=href){
        let div_arr=document.getElementsByClassName('ant-anchor-link');
        let num=href-21;
        for(let a=0;a<9;a++){
          div_arr[a].setAttribute("class", "ant-anchor-link");
        }
        div_arr[num].setAttribute("class", "ant-anchor-link ant-anchor-link-active");
        mythis.setState({
          href:href
        })
      }
    })
  }



  render() {
    const rankData2111={
      colNames:[
        {title: ' ', dataIndex: 'TIME_ID',key: 'TIME_ID',width:100},
        {title: 'Positive',dataIndex: 'Positive',key: 'Positive',width:100},
        {title: 'Negative',dataIndex: 'Negative',key: 'Negative',width:100}
      ],
      pageSize:3,
      total:2,
      defaultCurrent:1,
      data:[
        {key:1,TIME_ID:"True",Positive:"True Positive (TP)",Negative:'True Negative (TN)'},
        {key:2,TIME_ID:"False",Positive:"False Positive (FP)",Negative:'False Negative (FN)'}
      ]
    };
    const rankData222={
      colNames:[
        {title: '日志密度', dataIndex: 'ri',key: 'ri',width:100},
        {title: '好友密度',dataIndex: 'hao',key: 'hao',width:100},
        {title: '是否使用真实头像',dataIndex: 'shi',key: 'shi',width:100},
        {title: '账号是否真实',dataIndex: 'zhang',key: 'zhang',width:100}
      ],
      pageSize:10,
      total:10,
      defaultCurrent:1,
      data:[
        {key:1,ri:"s",hao:"s",shi:'no',zhang:'no'},
        {key:2,ri:"s",hao:"l",shi:'yes',zhang:'yes'},
        {key:3,ri:"l",hao:"m",shi:'yes',zhang:'yes'},
        {key:4,ri:"m",hao:"m",shi:'yes',zhang:'yes'},
        {key:5,ri:"l",hao:"m",shi:'yes',zhang:'yes'},
        {key:6,ri:"m",hao:"l",shi:'no',zhang:'yes'},
        {key:7,ri:"m",hao:"s",shi:'no',zhang:'no'},
        {key:8,ri:"l",hao:"m",shi:'no',zhang:'yes'},
        {key:9,ri:"m",hao:"s",shi:'no',zhang:'yes'},
        {key:10,ri:"s",hao:"s",shi:'yes',zhang:'no'}
      ]
    };
    return (
      <div>
        <div className="ant-affix">
          <div className="ant-anchor-wrapper" style={{maxHeight: '100vh', position: 'fixed', right: '10px', top: '150px', width: '150'}}>
            <div className="ant-anchor" onClick={this.clickit}>
              <div className="ant-anchor-ink">
                <span className="ant-anchor-ink-ball visible" style={{top: (this.state.href-20)*30-20}}></span></div>
              <div className="ant-anchor-link"><a className="ant-anchor-link-title" href_="21" title="评价模型性能常用指标">评价模型性能常用指标</a></div>
              <div className="ant-anchor-link"><a className="ant-anchor-link-title " href_="22" title="决策树">决策树</a></div>
              <div className="ant-anchor-link"><a className="ant-anchor-link-title" href_="23" title="随机森林">随机森林</a></div>
              <div className="ant-anchor-link"><a className="ant-anchor-link-title" href_="24" title="逻辑回归">逻辑回归</a></div>
              <div className="ant-anchor-link"><a className="ant-anchor-link-title" href_="25" title="SVM">SVM</a></div>
              <div className="ant-anchor-link"><a className="ant-anchor-link-title" href_="26" title="朴素贝叶斯">朴素贝叶斯</a></div>
              <div className="ant-anchor-link"><a className="ant-anchor-link-title" href_="27" title="K-means">K-means</a></div>
              <div className="ant-anchor-link"><a className="ant-anchor-link-title" href_="28" title="Adaboost">Adaboost</a></div>
              <div className="ant-anchor-link"><a className="ant-anchor-link-title" href_="29" title="网络神经">网络神经</a></div>
            </div>
          </div>
        </div>



        <div className="target-fix" id='21'>
          <h2 className="title-one">评价模型性能常用指标</h2>
          <h4 className="title-two">分类算法中评价模型性能常用质保</h4>
          <div className="title-three">1.混淆矩阵</div>
          <div>
            <Table  dataSource={rankData2111.data} columns={rankData2111.colNames} pagination={false}  />
            <div className="content-row">True Positive(真正, TP)：将正类预测为正类数</div>
            <div className="content-row">True Negative(真负 , TN)：将负类预测为负类数</div>
            <div className="content-row">False Positive(假正, FP)：将负类预测为正类数，即误报</div>
            <div className="content-row">False Negative(假负 , FN)：将正类预测为负类数，即漏报</div>
          </div>
          <div className="title-three">2.精确率(precision)</div>
          <div>
            <div className="content-row">精确率是针对我们预测结果而言的，它表示的是预测为正的样本中有多少是真正的正样本。P = TP / ( TP + FP )</div>
          </div>
          <div className="title-three">3.准确率(accuracy)</div>
          <div>
            <div className="content-row">ACC = ( TP + TN ) / ( TP + TN + FP + FN )
              在正负样本不平衡的情况下，准确率这个评价指标有很大的缺陷。比如在互联网广告里面，点击的数量是很少的，一般只有千分之几，如果用
              acc，即使全部预测成负类（不点击）acc 也有 99% 以上，没有意义。</div>
          </div>
          <div className="title-three">4.召回率</div>
          <div className="content-row">
            召回率是针对我们原来的样本而言的，它表示的是样本中的正例有多少被预测正确了。那也有两种可能，一种是把原来的正类预测成正类
            (TP)，另一种就是把原来的正类预测为负类(FN)。R = TP / ( TP + FN )
          </div>
          <div className="title-three">5.ROC曲线</div>
          <div className="content-row">
            举个例子，我们在分类的时候设一个阈值，大于这个值的为正类，小于这个值为负类。如果我们减小这个阀值，那么更多的样本会被识别为正类。这会提高正类的识别率，但同时也会使得更多的负类被错误识别为正类。为了形象化这一变化，在此引入 ROC ，ROC 曲线可以用于评价一个分类器好坏。
          </div>
          <div className="content-row">ROC 关注两个指标，True positive rate代表能将正例分对的概率和 False positive rate代表将负例错分为正例的概率：
            True positive rate： TPR = TP / ( TP + FN ).False positive rate： FPR = FP / ( FP + TN ) 在 ROC 空间中，每个点的横坐标是 FPR，纵坐标是 TPR，这也就描绘了分类器在 TP（真正率）和 FP（假正率）间的平衡关系。
          </div>
          <img src={"/images/2115.png"}></img>
          <div className="content-row">
            ROC曲线中的四个点和一条线:点(0,1)：即FPR=0, TPR=1，意味着FN＝0且FP＝0，将所有的样本都正确分类；点(1,0)：即FPR=1，TPR=0，最差分类器，避开了所有正确答案；
            点(0,0)：即FPR=TPR=0，FP＝TP＝0，分类器预测所有的样本都为负样本（negative）；点(1,1)：分类器实际上预测所有的样本都为正样本。
          </div>
          <div className="content-row">
            总之：ROC曲线越接近左上角，该分类器的性能越好。
          </div>
          <div className="title-three">6.AUC</div>
          <div className="content-row">AUC（Area Under Curve）被定义为ROC曲线下的面积。</div>
          <div className="content-row">随机挑选一个正样本以及一个负样本，分类器判定正样本的值高于负样本的概率就是 AUC 值。AUC值越大的分类器，正确率越高</div>
          <div className="content-row">（1）0.5&lt;AUC&lt;1，优于随机猜测。这个分类器（模型）妥善设定阈值的话，能有预测价值。</div>
          <div className="content-row">（2）AUC=0.5，跟随机猜测一样（例：丢铜板），模型没有预测价值。</div>
          <div className="content-row">（3）AUC&lt;0.5，比随机猜测还差；但只要总是反预测而行，就优于随机猜测，因此不存在 AUC&lt;0.5 AUC&lt;0.5 的情况。</div>
          <img src={"/images/2116.png"}></img>
          <div className="title-three">7.F1值</div>
          <div className="content-row">F1值 = ( 2*召回率 / 精确率 ) / ( 召回率 + 精确率 )</div>
          <div className="title-three">8.KS图</div>
          <div className="content-row">正样本洛伦兹曲线记为f(x)，负样本洛伦兹曲线记为g(x)，K-S曲线实际上是f(x)与g(x)的差值曲线。K-S曲线的最高点（最大值）定义为KS值，KS值越大，模型分值的区分度越好，KS值为0代表是最没有区分度的随机模型。准确的来说，K-S是用来度量阳性与阴性分类区分程度的。</div>
          <img src={"/images/2118.png"}></img>

          <h4 className="title-two">回归算法中评价模型性能常用质保</h4>
          <div className="title-three">1.MSE（平均平方误差）</div>
          <img src="/images/2121.png"/>
          <div className="title-three">2.MAE（平均绝对误差）</div>
          <img src="/images/2122.png"/>
          <div className="title-three">3.RMSE（均方根误差）</div>
          <div className="title-three">为MSE的平方根。</div>
          <div className="title-three">4.MAPE（平均绝对百分误差）</div>
          <img src="/images/2124.png"/>
          <div className="content-row">预测数据和原始数据对应点误差的平方和的均值</div>
        </div>

        <div className="target-fix" id='22'>
          <h2 className="title-one">决策树</h2>
          <h4 className="title-two">浅层示例</h4>
          <div className="content-row">根据一些标签进行分类，每个节点提一个问题，通过判断，将数据分为两类，再继续提问。这些问题是根据已有数据学习出来的，再投入新数据的时候，就可以根据这棵树上的问题，将数据划分到合适的叶子上。</div>
          <img src="/images/221.png"/>
          <h4 className="title-two">算法讲解</h4>
          <div className="content-row">构造决策树的关键步骤是分裂属性。所谓分裂属性就是在某个节点处按照某一特征属性的不同划分构造不同的分支，其目标是让各个分裂子集尽可能地“纯”。尽可能“纯”就是尽量让一个分裂子集中待分类项属于同一类别。分裂属性分为三种不同的情况：</div>
          <div className="content-row">1、属性是离散值且不要求生成二叉决策树。此时用属性的每一个划分作为一个分支。</div>
          <div className="content-row">2、属性是离散值且要求生成二叉决策树。此时使用属性划分的一个子集进行测试，按照“属于此子集”和“不属于此子集”分成两个分支。</div>
          <div className="content-row">3、属性是连续值。此时确定一个值作为分裂点split_point，按照&lg;split_point和&lt;split_point生成两个分支。</div>
          <div className="content-row">构造决策树的关键性内容是进行属性选择度量，属性选择度量是一种选择分裂准则，是将给定的类标记的训练集合的数据划分D“最好”地分成个体类的启发式方法，它决定了拓扑结构及分裂点split_point的选择。</div>
          <div className="content-row">属性选择度量算法有很多，一般使用自顶向下递归分治法，并采用不回溯的贪心策略。这里介绍ID3和C4.5两种常用算法。</div>
          <div className="content-row">（1）ID3算法</div>
          <div className="content-row">从信息论知识中我们知道，期望信息越小，信息增益越大，从而纯度越高。所以ID3算法的核心思想就是以信息增益度量属性选择，选择分裂后信息增益最大的属性进行分裂。下面先定义几个要用到的概念。 设D为用类别对训练元组进行的划分，则D的熵（entropy）表示为：</div>
          <img src="/images/2221.png"/>
          <div className="content-row">其中pi表示第i个类别在整个训练元组中出现的概率，可以用属于此类别元素的数量除以训练元组元素总数量作为估计。熵的实际意义表示是D中元组的类标号所需要的平均信息量。</div>
          <div className="content-row">现在我们假设将训练元组D按属性A进行划分，则A对D划分的期望信息为：</div>
          <img src="/images/2222.png"/>
          <div className="content-row">而信息增益即为两者的差值：</div>
          <img src="/images/2223.png"/>
          <div className="content-row">ID3算法就是在每次需要分裂时，计算每个属性的增益率，然后选择增益率最大的属性进行分裂。下面我们继续用SNS社区中不真实账号检测的例子说明如何使用ID3算法构造决策树。为了简单起见，我们假设训练集合包含10个元素：</div>
          <Table  dataSource={rankData222.data} columns={rankData222.colNames} pagination={false}  />
          <div className="content-row">其中s、m和l分别表示小、中和大。</div>
          <div className="content-row">设L、F、H和R表示日志密度、好友密度、是否使用真实头像和账号是否真实，下面计算各属性的信息增益。</div>
          <img src="/images/2224.png"/>
          <img src="/images/2225.png"/>
          <img src="/images/2226.png"/>
          <div className="content-row">因此日志密度的信息增益是0.276。</div>
          <div className="content-row">用同样方法得到H和F的信息增益分别为0.033和0.553。</div>
          <div className="content-row">因为F具有最大的信息增益，所以第一次分裂选择F为分裂属性，分裂后的结果如下图表示：</div>
          <img src="/images/2227.png"/>
          <div className="content-row">在上图的基础上，再递归使用这个方法计算子节点的分裂属性，最终就可以得到整个决策树。</div>
          <div className="content-row">上面为了简便，将特征属性离散化了，其实日志密度和好友密度都是连续的属性。对于特征属性为连续值，可以如此使用ID3算法：</div>
          <div className="content-row">先将D中元素按照特征属性排序，则每两个相邻元素的中间点可以看做潜在分裂点，从第一个潜在分裂点开始，分裂D并计算两个集合的期望信息，具有最小期望信息的点称为这个属性的最佳分裂点，其信息期望作为此属性的信息期望。</div>
          <div className="content-row">（2）C4.5算法</div>
          <div className="content-row">ID3算法存在一个问题，就是偏向于多值属性，例如，如果存在唯一标识属性ID，则ID3会选择它作为分裂属性，这样虽然使得划分充分纯净，但这种划分对分类几乎毫无用处。ID3的后继算法C4.5使用增益率（gain ratio）的信息增益扩充，试图克服这个偏倚。</div>
          <div className="content-row">C4.5算法首先定义了“分裂信息”，其定义可以表示成：</div>
          <img src="/images/2228.png"/>
          <div className="content-row">其中各符号意义与ID3算法相同，然后，增益率被定义为：</div>
          <img src="/images/2229.png"/>
          <div className="content-row">C4.5选择具有最大增益率的属性作为分裂属性，其具体应用与ID3类似，不再赘述。</div>
        </div>

        <div className="target-fix" id='23'>
          <h2 className="title-one">随机森林</h2>
          <h4 className="title-two">浅层示例</h4>
          <div className="content-row">训练N颗决策树，放在一起变成了随机森林。将新数据投入到这N个树中，得到N个分类结果，计数看预测成哪一类的数目最多，就将此类别作为最后的预测结果。</div>
          <img src="/images/231.png"/>
          <h4 className="title-two">算法讲解</h4>
          <div className="content-row">想要得到泛化性能强的集成，集成中的个体学习器应尽可能相互独立，但是相互独立很难做到，我们可以做的是使基学习器尽可能具有较大的差异。</div>
          <div className="content-row">（1）Bagging</div>
          <div className="content-row">Bagging是并行式集成学习方法的著名代表，它是基于自助采样法(有放回的取样)来提高学习器泛化能力的一种很高效的集成学习方法。Bagging的策略：</div>
          <div className="content-row">a.从样本集D中用Bootstrap采样选出n个样本，执行m次，选出m个样本子集{"{D1,D2,...,Dm}"}</div>
          <div className="content-row">b.在所有属性上，分别对应这m个样本子集建立m个学习器{"{h1(x),h2(x),...,hm(x)}"}</div>
          <div className="content-row">c.将这m个学习器放在各自的训练数据上进行学习</div>
          <div className="content-row">d.通过投票法或平均法对这m个学习器进行结合</div>
          <div className="content-row">由于Bagging采用的是Bootstrap采样，那么基学习器大概只使用了初始训练集中越63.2%的样本，剩下越36.8%的样本可以用作验证集来对泛化性能进行估计。</div>
          <div className="content-row">（2）随机森林</div>
          <div className="content-row">随机森林(RandomForest)是以决策树为基学习器构建Bagging集成的基础上进一步在决策树的训练过程中引入了随机属性选择。</div>
          <div className="content-row">随机森林的策略</div>
          <div className="content-row">a.从样本集中用Bootstrap采样选出n个样本</div>
          <div className="content-row">b.在树的每个节点上，从所有属性中随机选择k个属性，选择出一个最佳分割属性作为节点,建立决策树，k一般选为log2d,d表示属性的总个数</div>
          <div className="content-row">c.重复以上两步m次，建立m棵决策数</div>
          <div className="content-row">d.这m棵决策树形成RandomForest</div>
          <div className="content-row">随机森林中基学习器的多样性不仅来自样本扰动，还来自属性的扰动，因此最终集成的泛华性能有显著的提高。</div>
          <div className="content-row">（3）结合策略</div>
          <div className="content-row">a.平均法</div>
          <div className="content-row">Bagging对回归任务，或者对数值型输出，常见的组合策略是使用平均法。</div>
          <div className="content-row">简单平均法:H(x)=1TΣTi=1hi(x)</div>
          <div className="content-row">加权平均法:H(x)=ΣTi=1wihi(x)</div>
          <div className="content-row">其中wi是个体学习器hi的权值，通常要求wi≥0,ΣTi=1wi=1</div>
          <div className="content-row">现实任务中的训练样本通常不充分或者是存在噪声的，这会导致我们学习得到的权值不完全可靠，对与规模较大的集成来说，所需要学习的权值较多，又可能会导致过拟合问题，因此加权平均法未必一定优于简单平均法</div>
          <div className="content-row">b.投票法</div>
          <div className="content-row">Bagging对分类任务，常见的组合策略是使用投票法。设学习器hi将从类别标记集合{"{c1,c2,...,cN}"}中预测出一个标记，我们将hi在样本x上的预测输出表示为一个N维向量(h1i(x);h2i(x);...;hNi(x)),其中hji(x)是hi在类别cj上的输出。</div>
          <div className="content-row">绝对多数投票法</div>
          <img src="/images/2321.png"/>
          <div className="content-row">即若某标记得票过半数，则预测为该标记，否则拒绝预测。</div>
          <div className="content-row">相对多数投票法 </div>
          <div className="content-row">H(x)=cargmaxc∑Tt=1hji(x)</div>
          <div className="content-row">即预测为得票最多的标记，若有多个标记得最高票，则从中随机选取一个</div>
          <div className="content-row">加权投票法</div>
          <div className="content-row">H(x)=cargmaxc∑Tt=1wihji(x)</div>
          <div className="content-row">与加权平均法类似，其中wi是个体学习器hi的权值，通常要求wi≥0,ΣTi=1wi=1</div>
          <div className="content-row">学习法 </div>
          <div className="content-row">当训练数据很多的时候，学习法是一种很好的策略，Stacking 是学习法的典型代表，我们将个体学习器称为初级学习器，用于结合的学习器称为次级学习器或元学习器。</div>
          <div className="content-row">原理：从初始的数据集训练出初级学习器，然后生成一个数据集，即初级学习器的输出来训练次级学习器，初级学习器的输出被当作样例输入的特征 ，初始样本的标记仍当作样本标记 </div>
          <div className="content-row">注意事项：次级训练集是利用初级学习器参数的，若直接使用初级学习器的训练集产生次级训练集，会有较高的过拟合风险，因此一般是通过使用交叉验证或留一法的方式用训练初级学习器为使用的样本来参数次级学习器的训练样本。</div>
        </div>

        <div className="target-fix" id='24'>
          <h2 className="title-one">逻辑回归</h2>
          <h4 className="title-two">浅层示例</h4>
          <div className="content-row">逻辑回归是一个分类算法，它预测出来的该数据被划分为正样本的概率大小，预测值范围为（0,1）。</div>
          <div className="content-row">要说逻辑回归，我们得追溯到线性回归，想必大家对线性回归都有一定的了解，即对于多维空间中存在的样本点，我们用特征的线性组合去拟合空间中点的分布和轨迹。如下图所示：</div>
          <img src="/images/2411.png" style={{width:700,height:550}}/>
          <div className="content-row">线性回归能对连续值结果进行预测，而现实生活中常见的另外一类问题是，分类问题。最简单的情况是是与否的二分类问题。比如说医生需要判断病人是否生病，银行要判断一个人的信用程度是否达到可以给他发信用卡的程度，邮件收件箱要自动对邮件分类为正常邮件和垃圾邮件等等。</div>
          <div className="content-row">当然，我们最直接的想法是，既然能够用线性回归预测出连续值结果，那根据结果设定一个阈值是不是就可以解决这个问题了呢？事实是，对于很标准的情况，确实可以的，这里我们套用Andrew Ng老师的课件中的例子，下图中X为数据点肿瘤的大小，Y为观测结果是否是恶性肿瘤。通过构建线性回归模型，如hθ(x)所示，构建线性回归模型后，我们设定一个阈值0.5，预测hθ(x)≥0.5的这些点为恶性肿瘤，而hθ(x)&lt;0.5为良性肿瘤。</div>
          <img src="/images/2412.png"/>
          <div className="content-row">但很多实际的情况下，我们需要学习的分类数据并没有这么精准，比如说上述例子中突然有一个不按套路出牌的数据点出现，如下图所示：</div>
          <img src="/images/2413.png"/>
          <div className="content-row">你看，现在你再设定0.5，这个判定阈值就失效了，而现实生活的分类问题的数据，会比例子中这个更为复杂，而这个时候我们借助于线性回归+阈值的方式，已经很难完成一个鲁棒性很好的分类器了。</div>
          <div className="content-row">在这样的场景下，逻辑回归就诞生了。它的核心思想是，如果线性回归的结果输出是一个连续值，而值的范围是无法限定的，那我们有没有办法把这个结果值映射为可以帮助我们判断的结果呢。而如果输出结果是 (0,1) 的一个概率值，这个问题就很清楚了。我们在数学上找了一圈，还真就找着这样一个简单的函数了，就是很神奇的sigmoid函数(如下)：</div>
          <img src="/images/2414.png"/>
          <div className="content-row">如果把sigmoid函数图像画出来，是如下的样子：</div>
          <img src="/images/2415.png"/>
          <div className="content-row">从函数图上可以看出，函数y=g(z)在z=0的时候取值为1/2，而随着z逐渐变小，函数值趋于0，z逐渐变大的同时函数值逐渐趋于1，而这正是一个概率的范围。</div>
          <div className="content-row">所以我们定义线性回归的预测函数为Y=WTX，那么逻辑回归的输出Y= g(WTX)，其中y=g(z)函数正是上述sigmoid函数(或者简单叫做S形函数)。</div>
          <h4 className="title-two">算法讲解</h4>
          <div className="content-row">逻辑回归一般用来解决分类问题。是有监督学习。Logistic Regression分类器实际上是一个0/1二分类器。可简单的理解为线性回归加上一个Sigmoid函数，即把线性回归输出作为Sigmoid函数的输入。有些分类问题并不是线性可分的，但我们可以通过特征映射将非线性问题转换为线性问题来求解。Sigmoid函数的作用是：将线性回归的输出，如从负无穷到正无穷，压缩到(0~1)之间。</div>
          <div className="content-row">Sigmoid函数为:g(z)=1/(1+e^(-z) )线性回归位:f(x)=w^T x=w_0 x_0+w_1 x_1+w_2 x_2 +⋯+w_n x_n+x_N =1</div>
          <div className="content-row">逻辑回归便是将线性回归输出作为Sigmoid函数的输入的Sigmoid函数。g(z)=  1/(1+e^(-w^T x) )</div>
          <div className="content-row">我们可以通过逻辑回归公式判定边界:</div>
          <div className="content-row">当线性函数f(x)=0,此时Sigmoid函数g(f(x))=0.5。</div>
          <div className="content-row">当线性函数f(x)>0,此时Sigmoid函数g(f(x))>0.5，g(z)∈(0.5∼1.0)，认为当前数据样本x为类别1。</div>
          <div className="content-row">当线性函数f(x)&lt;0,此时Sigmoid函数g(f(x))&lt;0.5，g(z)∈(0.0∼0.5)，认为当前数据样本x为类别0。</div>
          <div className="content-row">这就是逻辑回归分类的决策原理。选择0.5作为阈值是一般的做法，实际工程中可根据需求选择阈值。如对正例的要求较高，阈值可以大一些。</div>
          <div className="content-row">接下来，我们看一下新的名词——损失函数。</div>
          <div className="content-row">逻辑回归的目标在于找到判定边界。判定边界即Sigmoid函数的输入函数。判断判定边界的的优劣需要用到损失函数。</div>
          <img src="/images/2421.png"/>
          <div className="content-row">g(x)：Sigmoid函数预测的类别概率。</div>
          <div className="content-row">y：原类别,0或1。</div>
          <div className="content-row">若本身是正样本y=1，预测成了负样本(如g(x)=0.01)，损失cost(g(x),y)就非常大。</div>
          <div className="content-row">若本身是负样本y=0，预测成了正样本(如g(x)=0.999)，损失cost(g(x),y)也非常大。</div>
          <div className="content-row">损失函数合并得到平均损失： </div>
          <img src="/images/2422.png"/>
          <div className="content-row">g(xi)：Sigmoid函数预测的类别概率。</div>
          <div className="content-row">y：原类别,0或1。</div>
          <div className="content-row">带上正则化的损失函数：</div>
          <img src="/images/2423.png"/>
          <div className="content-row">正则化项，权重的L2范数乘以一个正则化系数。一定程度上防止过拟合。</div>
          <div className="content-row"><img src="/images/2424.png"/>该函数是凸函数，有全局最低点，可以通过梯度下降法去求解。</div>
        </div>

        <div className="target-fix" id='25'>
          <h2 className="title-one">SVM</h2>
          <h4 className="title-two">浅层示例</h4>
          <div className="content-row">SVM是一个分类算法，在工单质检里面，分类就是根据某些特去判断是属于哪个业务类别。</div>
          <div className="content-row">讲个故事：</div>
          <div className="content-row">在很久以前的情人节，大侠要去救他的爱人，但魔鬼和他玩了一个游戏。</div>
          <div className="content-row">魔鬼在桌子上似乎有规律放了两种颜色的球，说：“你用一根棍分开它们？要求：尽量在放更多球之后，仍然适用。”</div>
          <img src="/images/2511.png"/>
          <div className="content-row">于是大侠这样放，干的不错？ </div>
          <img src="/images/2512.png"/>
          <div className="content-row">然后魔鬼，又在桌上放了更多的球，似乎有一个球站错了阵营。 </div>
          <img src="/images/2513.png"/>
          <div className="content-row">SVM就是试图把棍放在最佳位置，好让在棍的两边有尽可能大的间隙。</div>
          <img src="/images/2514.png"/>
          <div className="content-row">现在即使魔鬼放了更多的球，棍仍然是一个好的分界线。 </div>
          <img src="/images/2515.png"/>
          <div className="content-row">然后，在SVM 工具箱中有另一个更加重要的 trick。 魔鬼看到大侠已经学会了一个trick，于是魔鬼给了大侠一个新的挑战。 </div>
          <img src="/images/2516.png"/>
          <div className="content-row">现在，大侠没有棍可以很好帮他分开两种球了，现在怎么办呢？当然像所有武侠片中一样大侠桌子一拍，球飞到空中。然后，凭借大侠的轻功，大侠抓起一张纸，插到了两种球的中间。</div>
          <img src="/images/2517.png"/>
          <div className="content-row">现在，从魔鬼的角度看这些球，这些球看起来像是被一条曲线分开了。</div>
          <img src="/images/2518.png"/>
          <div className="content-row">再之后，无聊的大人们，把这些球叫做数据，把棍子 叫做 分类器, 最大间隙trick 叫做最优化, 那张纸叫做超平面。</div>
          <div className="content-row">SVM就是将数据利用超平面进行分类，力求达到最优化。</div>
        </div>

        <div className="target-fix" id='26'>
          <h2 className="title-one">朴素贝叶斯</h2>
          <h4 className="title-two">浅层示例</h4>
          <div className="content-row">举个例子，你在路上看到一个黑人且比较高，你十有八九猜他是从非洲来的。因为在没有其他可用信息的前提下，一般来说大部分非洲人符合这种特征，所以你会选择最大概率是非洲人，这种思想就是贝叶斯思想。</div>
          <h4 className="title-two">算法讲解</h4>
          <div className="content-row">贝叶斯定理解决了现实生活里经常遇到的问题：已知某条件概率，如何得到两个事件交换后的概率，也就是在已知P(A|B)的情况下如何求得P(B|A)。这里先解释什么是条件概率：</div>
          <img src="/images/2621.png"/>
          <div className="content-row">表示事件B已经发生的前提下，事件A发生的概率，叫做事件B发生下事件A的条件概率。其基本求解公式为：</div>
          <img src="/images/2622.png"/>
          <div className="content-row">贝叶斯定理之所以有用，是因为我们在生活中经常遇到这种情况：我们可以很容易直接得出P(A|B)，P(B|A)则很难直接得出，但我们更关心P(B|A)，贝叶斯定理就为我们打通从P(A|B)获得P(B|A)的道路。</div>
          <div className="content-row">下面不加证明地直接给出贝叶斯定理：</div>
          <img src="/images/2623.png"/>
          <div className="content-row">朴素贝叶斯分类是一种十分简单的分类算法，叫它朴素贝叶斯分类是因为这种方法的思想真的很朴素，朴素贝叶斯的思想基础是这样的：对于给出的待分类项，求解在此项出现的条件下各个类别出现的概率，哪个最大，就认为此待分类项属于哪个类别。通俗来说，就好比这么个道理，你在街上看到一个黑人，我问你你猜这哥们哪里来的，你十有八九猜非洲。为什么呢？因为黑人中非洲人的比率最高，当然人家也可能是美洲人或亚洲人，但在没有其它可用信息下，我们会选择条件概率最大的类别，这就是朴素贝叶斯的思想基础。</div>
          <div className="content-row">
            朴素贝叶斯分类的正式定义如下：<br/>
            1、设<img src="/images/2624.png"/>为一个待分类项，而每个a为x的一个特征属性。<br/>
            2、有类别集合<img src="/images/2625.png"/><br/>
            3、计算<img src="/images/2626.png"/>为一个待分类项，而每个a为x的一个特征属性。<br/>
            4、如果<img src="/images/2627.png"/>，则<img src="/images/2628.png"/>。<br/>
          </div>
          <div className="content-row">那么现在的关键就是如何计算第3步中的各个条件概率。我们可以这么做：</div>
          <div className="content-row">1、找到一个已知分类的待分类项集合，这个集合叫做训练样本集。</div>
          <div className="content-row">2、统计得到在各类别下各个特征属性的条件概率估计。即<img src="/images/2629.png"/></div>
          <div className="content-row">3、如果各个特征属性是条件独立的，则根据贝叶斯定理有如下推导：<img src="/images/26210.png"/></div>
          <div className="content-row">因为分母对于所有类别为常数，因为我们只要将分子最大化皆可。又因为各特征属性是条件独立的，所以有：<img src="/images/26211.png"/></div>
          <div className="content-row">朴素贝叶斯分类分为三个阶段：</div>
          <div className="content-row">第一阶段——准备工作阶段，这个阶段的任务是为朴素贝叶斯分类做必要的准备，主要工作是根据具体情况确定特征属性，并对每个特征属性进行适当划分，然后由人工对一部分待分类项进行分类，形成训练样本集合。这一阶段的输入是所有待分类数据，输出是特征属性和训练样本。这一阶段是整个朴素贝叶斯分类中唯一需要人工完成的阶段，其质量对整个过程将有重要影响，分类器的质量很大程度上由特征属性、特征属性划分及训练样本质量决定。</div>
          <div className="content-row">第二阶段——分类器训练阶段，这个阶段的任务就是生成分类器，主要工作是计算每个类别在训练样本中的出现频率及每个特征属性划分对每个类别的条件概率估计，并将结果记录。其输入是特征属性和训练样本，输出是分类器。这一阶段是机械性阶段，根据前面讨论的公式可以由程序自动计算完成。</div>
          <div className="content-row">第三阶段——应用阶段。这个阶段的任务是使用分类器对待分类项进行分类，其输入是分类器和待分类项，输出是待分类项与类别的映射关系。这一阶段也是机械性阶段，由程序完成。</div>
          <div className="content-row">那应如何估计类别下特征属性划分的条件概率及Laplace校准呢？</div>
          <div className="content-row">由上文看出，计算各个划分的条件概率P(a|y)是朴素贝叶斯分类的关键性步骤，当特征属性为离散值时，只要很方便的统计训练样本中各个划分在每个类别中出现的频率即可用来估计P(a|y)，下面重点讨论特征属性是连续值的情况。</div>
          <div className="content-row">当特征属性为连续值时，通常假定其值服从高斯分布（也称正态分布）。即：<img src="/images/26212.png"/>而<img src="/images/26213.png"/></div>
          <div className="content-row">因此只要计算出训练样本中各个类别中此特征项划分的各均值和标准差，代入上述公式即可得到需要的估计值。均值与标准差的计算在此不再赘述。</div>
          <div className="content-row">另一个需要讨论的问题就是当P(a|y)=0怎么办，当某个类别下某个特征项划分没有出现时，就是产生这种现象，这会令分类器质量大大降低。为了解决这个问题，我们引入Laplace校准，它的思想非常简单，就是对没类别下所有划分的计数加1，这样如果训练样本集数量充分大时，并不会对结果产生影响，并且解决了上述频率为0的尴尬局面。</div>
          <div className="content-row">举例说明：</div>
          <div className="content-row">下面讨论一个使用朴素贝叶斯分类解决实际问题的例子，为了简单起见，对例子中的数据做了适当的简化。</div>
          <div className="content-row">这个问题是这样的，对于SNS社区来说，不真实账号（使用虚假身份或用户的小号）是一个普遍存在的问题，作为SNS社区的运营商，希望可以检测出这些不真实账号，从而在一些运营分析报告中避免这些账号的干扰，亦可以加强对SNS社区的了解与监管。</div>
          <div className="content-row">如果通过纯人工检测，需要耗费大量的人力，效率也十分低下，如能引入自动检测机制，必将大大提升工作效率。这个问题说白了，就是要将社区中所有账号在真实账号和不真实账号两个类别上进行分类，下面我们一步一步实现这个过程。</div>
          <div className="content-row">首先设C=0表示真实账号，C=1表示不真实账号。</div>
          <div className="content-row">1、确定特征属性及划分</div>
          <div className="content-row">这一步要找出可以帮助我们区分真实账号与不真实账号的特征属性，在实际应用中，特征属性的数量是很多的，划分也会比较细致，但这里为了简单起见，我们用少量的特征属性以及较粗的划分，并对数据做了修改。</div>
          <div className="content-row">我们选择三个特征属性：a1：日志数量/注册天数，a2：好友数量/注册天数，a3：是否使用真实头像。在SNS社区中这三项都是可以直接从数据库里得到或计算出来的。</div>
          <div className="content-row">下面给出划分：a1：{"{a<=0.05,0.05<a<0.2,a>=0.2}，a1：{a<=0.1,0.1<a<0.8,a>=0.8}，a3：{a=0（不是）,a=1（是）}"}。</div>
          <div className="content-row">2、获取训练样本</div>
          <div className="content-row">这里使用运维人员曾经人工检测过的1万个账号作为训练样本。</div>
          <div className="content-row">3、计算训练样本中每个类别的频率</div>
          <div className="content-row">用训练样本中真实账号和不真实账号数量分别除以一万，得到：<img src="/images/26214.png"/><img src="/images/26215.png"/></div>
          <div className="content-row">4、计算每个类别条件下各个特征属性划分的频率</div>
          <div className="content-row"><img src="/images/26216.png"/></div>
          <div className="content-row"><img src="/images/26217.png"/></div>
          <div className="content-row"><img src="/images/26218.png"/></div>
          <div className="content-row"><img src="/images/26219.png"/></div>
          <div className="content-row"><img src="/images/26220.png"/></div>
          <div className="content-row"><img src="/images/26221.png"/></div>
          <div className="content-row"><img src="/images/26222.png"/></div>
          <div className="content-row"><img src="/images/26223.png"/></div>
          <div className="content-row"><img src="/images/26224.png"/></div>
          <div className="content-row"><img src="/images/26225.png"/></div>
          <div className="content-row"><img src="/images/26226.png"/></div>
          <div className="content-row"><img src="/images/26227.png"/></div>
          <div className="content-row"><img src="/images/26228.png"/></div>
          <div className="content-row"><img src="/images/26229.png"/></div>
          <div className="content-row"><img src="/images/26230.png"/></div>
          <div className="content-row"><img src="/images/26231.png"/></div>
          <div className="content-row">5、使用分类器进行鉴别</div>
          <div className="content-row">下面我们使用上面训练得到的分类器鉴别一个账号，这个账号使用非真实头像，日志数量与注册天数的比率为0.1，好友数与注册天数的比率为0.2。</div>
          <div className="content-row">5、使用分类器进行鉴别</div>
          <div className="content-row"><img src="/images/26232.png"/></div>
          <div className="content-row"><img src="/images/26233.png"/></div>
          <div className="content-row">可以看到，虽然这个用户没有使用真实头像，但是通过分类器的鉴别，更倾向于将此账号归入真实账号类别。这个例子也展示了当特征属性充分多时，朴素贝叶斯分类对个别属性的抗干扰性。</div>
        </div>

        <div className="target-fix" id='27'>
          <h2 className="title-one">K-means</h2>
          <h4 className="title-two">浅层示例</h4>
          <div className="content-row">想要将一组数据，分为三类，粉色数值大，黄色数值小。最开心先初始化，这里面选了最简单的 3，2，1 作为各类的初始值。剩下的数据里，每个都与三个初始值计算距离，然后归类到离它最近的初始值所在类别</div>
          <div className="content-row"><img src="/images/2711.png"/></div>
          <div className="content-row">分好类后，计算每一类的平均值，作为新一轮的中心点</div>
          <div className="content-row"><img src="/images/2712.png"/></div>
          <div className="content-row">几轮之后，分组不再变化了，就可以停止了</div>
          <div className="content-row"><img src="/images/2713.png"/></div>
          <div className="content-row"><img src="/images/2714.png"/></div>
          <h4 className="title-two">算法讲解</h4>
          <div className="content-row">1.基本Kmeans算法[1]</div>
          <div className="content-row">（1）选择K个点作为初始质心</div>
          <div className="content-row">（2）将每个点指派到最近的质心，形成K个簇</div>
          <div className="content-row">（3）重新计算每个簇的质心</div>
          <div className="content-row">（1）不断重复（2）（3），直至簇不发生变化或达到最大迭代次数  </div>
          <div className="content-row">2.注意问题</div>
          <div className="content-row">（1）K如何确定</div>
          <div className="content-row">kmenas算法首先选择K个初始质心，其中K是用户指定的参数，即所期望的簇的个数。这样做的前提是我们已经知道数据集中包含多少个簇，但很多情况下，我们并不知道数据的分布情况，实际上聚类就是我们发现数据分布的一种手段，这就陷入了鸡和蛋的矛盾。如何有效的确定K值，这里大致提供几种方法，A.与层次聚类结合</div>
          <div className="content-row">经常会产生较好的聚类结果的一个有趣策略是，首先采用层次凝聚算法决定结果粗的数目，并找到一个初始聚类，然后用迭代重定位来改进该聚类。B.稳定性方法</div>
          <div className="content-row">稳定性方法对一个数据集进行2次重采样产生2个数据子集，再用相同的聚类算法对2个数据子集进行聚类，产生2个具有k个聚类的聚类结果，计算2个聚类结果的相似度的分布情况。2个聚类结果具有高的相似度说明k个聚类反映了稳定的聚类结构，其相似度可以用来估计聚类个数。采用次方法试探多个k，找到合适的k值。</div>
          <div className="content-row">C.系统演化方法</div>
          <div className="content-row">系统演化方法将一个数据集视为伪热力学系统，当数据集被划分为K个聚类时称系统处于状态K。系统由初始状态K=1出发，经过分裂过程和合并过程，系统将演化到它的稳定平衡状态Ki，其所对应的聚类结构决定了最优类数Ki。系统演化方法能提供关于所有聚类之间的相对边界距离或可分程度，它适用于明显分离的聚类结构和轻微重叠的聚类结构。</div>
          <div className="content-row">D.使用canopy算法进行初始划分</div>
          <div className="content-row">（2）初始质心的选取</div>
          <div className="content-row">选择适当的初始质心是基本kmeans算法的关键步骤。常见的方法是随机的选取初始质心，但是这样簇的质量常常很差。处理选取初始质心问题的一种常用技术是：多次运行，每次使用一组不同的随机初始质心，然后选取具有最小SSE（误差的平方和）的簇集。这种策略简单，但是效果可能不好，这取决于数据集和寻找的簇的个数。</div>
          <div className="content-row">第二种有效的方法是，取一个样本，并使用层次聚类技术对它聚类。从层次聚类中提取K个簇，并用这些簇的质心作为初始质心。该方法通常很有效，但仅对下列情况有效：（1）样本相对较小，例如数百到数千（层次聚类开销较大）；（2）K相对于样本大小较小</div>
          <div className="content-row">第三种选择初始质心的方法，随机地选择第一个点，或取所有点的质心作为第一个点。然后，对于每个后继初始质心，选择离已经选取过的初始质心最远的点。使用这种方法，确保了选择的初始质心不仅是随机的，而且是散开的。但是，这种方法可能选中离群点。此外，求离当前初始质心集最远的点开销也非常大。为了克服这个问题，通常该方法用于点样本。由于离群点很少（多了就不是离群点了），它们多半不会在随机样本中出现。计算量也大幅减少。</div>
          <div className="content-row">第四种方法就是上面提到的canopy算法。</div>
          <div className="content-row">（3）距离的度量</div>
          <div className="content-row">常用的距离度量方法包括：欧几里得距离和余弦相似度。两者都是评定个体间差异的大小的。欧几里得距离度量会受指标不同单位刻度的影响，所以一般需要先进行标准化，同时距离越大，个体间差异越大；空间向量余弦夹角的相似度度量不会受指标刻度的影响，余弦值落于区间[-1,1]，值越大，差异越小。但是针对具体应用，什么情况下使用欧氏距离，什么情况下使用余弦相似度？</div>
          <div className="content-row">从几何意义上来说，n维向量空间的一条线段作为底边和原点组成的三角形，其顶角大小是不确定的。也就是说对于两条空间向量，即使两点距离一定，他们的夹角余弦值也可以随意变化。感性的认识，当两用户评分趋势一致时，但是评分值差距很大，余弦相似度倾向给出更优解。举个极端的例子，两用户只对两件商品评分，向量分别为(3,3)和(5,5)，这两位用户的认知其实是一样的，但是欧式距离给出的解显然没有余弦值合理。[6]</div>
          <div className="content-row">（4）质心的计算</div>
          <div className="content-row">对于距离度量不管是采用欧式距离还是采用余弦相似度，簇的质心都是其均值，即向量各维取平均即可。对于距离对量采用其它方式时，这个还没研究过。</div>
          <div className="content-row">（5）算法停止条件</div>
          <div className="content-row">一般是目标函数达到最优或者达到最大的迭代次数即可终止。对于不同的距离度量，目标函数往往不同。当采用欧式距离时，目标函数一般为最小化对象到其簇质心的距离的平方和，如下：</div>
          <div className="content-row"><img src="/images/2721.png"/></div>
          <div className="content-row">当采用余弦相似度时，目标函数一般为最大化对象到其簇质心的余弦相似度和，如下：</div>
          <div className="content-row"><img src="/images/2722.png"/></div>
          <div className="content-row">（6）空聚类的处理</div>
          <div className="content-row"> 如果所有的点在指派步骤都未分配到某个簇，就会得到空簇。如果这种情况发生，则需要某种策略来选择一个替补质心，否则的话，平方误差将会偏大。一种方法是选择一个距离当前任何质心最远的点。这将消除当前对总平方误差影响最大的点。另一种方法是从具有最大SSE的簇中选择一个替补的质心。这将分裂簇并降低聚类的总SSE。如果有多个空簇，则该过程重复多次。另外，编程实现时，要注意空簇可能导致的程序bug。</div>
          <div className="content-row">3.适用范围及缺陷</div>
          <div className="content-row"> Kmenas算法试图找到使平凡误差准则函数最小的簇。当潜在的簇形状是凸面的，簇与簇之间区别较明显，且簇大小相近时，其聚类结果较理想。前面提到，该算法时间复杂度为O(tKmn)，与样本数量线性相关，所以，对于处理大数据集合，该算法非常高效，且伸缩性较好。但该算法除了要事先确定簇数K和对初始聚类中心敏感外，经常以局部最优结束，同时对“噪声”和孤立点敏感，并且该方法不适于发现非凸面形状的簇或大小差别很大的簇。</div>
        </div>

        <div className="target-fix" id='28'>
          <h2 className="title-one">Adaboost</h2>
          <h4 className="title-two">浅层示例</h4>
          <div className="content-row">adaboost是bosting 的方法之一</div>
          <div className="content-row">bosting就是把若干个分类效果并不好的分类器综合起来考虑，会得到一个效果比较好的分类器。</div>
          <div className="content-row">下图，左右两个决策树，单个看是效果不怎么好的，但是把同样的数据投入进去，把两个结果加起来考虑，就会增加可信度</div>
          <div className="content-row"><img src="/images/2811.png"/></div>
          <h4 className="title-two">算法讲解</h4>
          <div className="content-row">首先，我们来看Adaboost的原理</div>
          <div className="content-row">AdaBoost，是英文"Adaptive Boosting"（自适应增强）的缩写，由Yoav Freund和Robert Schapire在1995年提出。它的自适应在于：前一个基本分类器分错的样本会得到加强，加权后的全体样本再次被用来训练下一个基本分类器。同时，在每一轮中加入一个新的弱分类器，直到达到某个预定的足够小的错误率或达到预先指定的最大迭代次数。</div>
          <div className="content-row">具体说来，整个Adaboost 迭代算法就3步:初始化训练数据的权值分布。如果有N个样本，则每一个训练样本最开始时都被赋予相同的权重：1/N。</div>
          <div className="content-row">训练弱分类器。具体训练过程中，如果某个样本点已经被准确地分类，那么在构造下一个训练集中，它的权重就被降低；相反，如果某个样本点没有被准确地分类，那么它的权重就得到提高。然后，权重更新过的样本集被用于训练下一个分类器，整个训练过程如此迭代地进行下去。</div>
          <div className="content-row">将各个训练得到的弱分类器组合成强分类器。各个弱分类器的训练过程结束后，加大分类误差率小的弱分类器的权重，使其在最终的分类函数中起着较大的决定作用，而降低分类误差率大的弱分类器的权重，使其在最终的分类函数中起着较小的决定作用。换言之，误差率低的弱分类器在最终分类器中占的权重较大，否则较小。</div>
          <div className="content-row">Adaboost算法流程如下：</div>
          <div className="content-row">
            给定一个训练数据集T={"{(x1,y1), (x2,y2)…(xN,yN)}"}，其中实例<img src="/images/2821.png"/>，而实例空间<img src="/images/2822.png"/>
            ，yi属于标记集合{"{-1,+1}"}，Adaboost的目的就是从训练数据中学习一系列弱分类器或基本分类器，然后将这些弱分类器组合成一个强分类器。
          </div>
          <div className="content-row">Adaboost的算法流程如下：</div>
          <div className="content-row">
            步骤1. 首先，初始化训练数据的权值分布。每一个训练样本最开始时都被赋予相同的权值：1/N。<br/>
            <img src="/images/2823.png"/><br/>
          </div>
          <div className="content-row">步骤2. 进行多轮迭代，用m = 1,2, ..., M表示迭代的第多少轮</div>
          <div className="content-row">a. 使用具有权值分布Dm的训练数据集学习，得到基本分类器（选取让误差率最低的阈值来设计基本分类器）</div>
          <div className="content-row">b. 计算Gm(x)在训练数据集上的分类误差率。由上述式子可知，Gm(x)在训练数据集上的误差率em就是被Gm(x)误分类样本的权值之和。</div>
          <div className="content-row">c. 计算Gm(x)的系数，am表示Gm(x)在最终分类器中的重要程度（目的：得到基本分类器在最终分类器中所占的权重）。由上述式子可知，em &lt;= 1/2时，am &gt;= 0，且am随着em的减小而增大，意味着分类误差率越小的基本分类器在最终分类器中的作用越大。</div>
          <div className="content-row">d. 更新训练数据集的权值分布（目的：得到样本的新的权值分布），用于下一轮迭代。使得被基本分类器Gm(x)误分类样本的权值增大，而被正确分类样本的权值减小。就这样，通过这样的方式，AdaBoost方法能“重点关注”或“聚焦于”那些较难分的样本上。其中，Zm是规范化因子，使得Dm+1成为一个概率分布。</div>
          <div className="content-row">步骤3. 组合各个弱分类器</div>
          <div className="content-row">从而得到最终分类器，如下：</div>
          <div className="content-row">举个 Adaboost的例子</div>
          <div className="content-row">下面，给定下列训练样本，请用AdaBoost算法学习一个强分类器。</div>
          <img src="/images/2824.png"/><br/>
          <div className="content-row">求解过程：初始化训练数据的权值分布，令每个权值W1i = 1/N = 0.1，其中，N = 10，i = 1,2, ..., 10，然后分别对于m = 1,2,3, ...等值进行迭代。</div>
          <div className="content-row">拿到这10个数据的训练样本后，根据 X 和 Y 的对应关系，要把这10个数据分为两类，一类是“1”，一类是“-1”，根据数据的特点发现：“0 1 2”这3个数据对应的类是“1”，“3 4 5”这3个数据对应的类是“-1”，“6 7 8”这3个数据对应的类是“1”，9是比较孤独的，对应类“-1”。抛开孤独的9不讲，“0 1 2”、“3 4 5”、“6 7 8”这是3类不同的数据，分别对应的类是1、-1、1，直观上推测可知，可以找到对应的数据分界点，比如2.5、5.5、8.5 将那几类数据分成两类。当然，这只是主观臆测，下面实际计算下这个具体过程。</div>
          <div className="content-row">迭代过程1</div>
          <div className="content-row">对于m=1，在权值分布为D1（10个数据，每个数据的权值皆初始化为0.1）的训练数据上，经过计算可得：</div>
          <div className="content-row">阈值v取2.5时误差率为0.3（x &lt; 2.5时取1，x > 2.5时取-1，则6 7 8分错，误差率为0.3），
            阈值v取5.5时误差率最低为0.4（x &lt; 5.5时取1，x > 5.5时取-1，则3 4 5 6 7 8皆分错，误差率0.6大于0.5，不可取。故令x > 5.5时取1，x &lt; 5.5时取-1，则0 1 2 9分错，误差率为0.4），
            阈值v取8.5时误差率为0.3（x &lt; 8.5时取1，x > 8.5时取-1，则3 4 5分错，误差率为0.3）。
          </div>
          <div className="content-row">可以看到，无论阈值v取2.5，还是8.5，总得分错3个样本，故可任取其中任意一个如2.5，弄成第一个基本分类器为：</div>
          <div className="content-row">上面说阈值v取2.5时则6 7 8分错，所以误差率为0.3，更加详细的解释是：因为样本集中。0 1 2对应的类（Y）是1，因它们本身都小于2.5，所以被G1(x)分在了相应的类“1”中，分对了。
            3 4 5本身对应的类（Y）是-1，因它们本身都大于2.5，所以被G1(x)分在了相应的类“-1”中，分对了。
            但6 7 8本身对应类（Y）是1，却因它们本身大于2.5而被G1(x)分在了类"-1"中，所以这3个样本被分错了。
            9本身对应的类（Y）是-1，因它本身大于2.5，所以被G1(x)分在了相应的类“-1”中，分对了。
            从而得到G1(x)在训练数据集上的误差率（被G1(x)误分类样本“6 7 8”的权值之和）e1=P(G1(xi)≠yi) = 3*0.1 = 0.3。
            然后根据误差率e1计算G1的系数：
          </div>
          <div className="content-row">这个a1代表G1(x)在最终的分类函数中所占的权重，为0.4236。接着更新训练数据的权值分布，用于下一轮迭代。
          </div>
          <div className="content-row">值得一提的是，由权值更新的公式可知，每个样本的新权值是变大还是变小，取决于它是被分错还是被分正确。</div>
          <div className="content-row">即如果某个样本被分错了，则yi * Gm(xi)为负，负负得正，结果使得整个式子变大（样本权值变大），否则变小。</div>
          <div className="content-row">第一轮迭代后，最后得到各个数据新的权值分布D2 = (0.0715, 0.0715, 0.0715, 0.0715, 0.0715,  0.0715,0.1666, 0.1666, 0.1666, 0.0715)。由此可以看出，因为样本中是数据“6 7 8”被G1(x)分错了，所以它们的权值由之前的0.1增大到0.1666，反之，其它数据皆被分正确，所以它们的权值皆由之前的0.1减小到0.0715。分类函数f1(x)= a1*G1(x) = 0.4236G1(x)。此时，得到的第一个基本分类器sign(f1(x))在训练数据集上有3个误分类点（即6 7 8）。</div>
          <div className="content-row">从上述第一轮的整个迭代过程可以看出：被误分类样本的权值之和影响误差率，误差率影响基本分类器在最终分类器中所占的权重。</div>
          <div className="content-row">迭代过程2</div>
          <div className="content-row">对于m=2，在权值分布为D2 = (0.0715, 0.0715, 0.0715, 0.0715, 0.0715,  0.0715, 0.1666, 0.1666, 0.1666, 0.0715)的训练数据上，经过计算可得：</div>
          <div className="content-row">阈值v取2.5时误差率为0.1666*3（x &lt; 2.5时取1，x > 2.5时取-1，则6 7 8分错，误差率为0.1666*3），
            阈值v取5.5时误差率最低为0.0715*4（x > 5.5时取1，x &lt; 5.5时取-1，则0 1 2 9分错，误差率为0.0715*3 + 0.0715），
            阈值v取8.5时误差率为0.0715*3（x &lt; 8.5时取1，x > 8.5时取-1，则3 4 5分错，误差率为0.0715*3）。
            所以，阈值v取8.5时误差率最低，故第二个基本分类器为：
          </div>
          <div className="content-row"><img src="/images/2825.png"/></div>
          <div className="content-row">面对的还是下述样本：</div>
          <div className="content-row"><img src="/images/2826.png"/></div>
          <div className="content-row">很明显，G2(x)把样本“3 4 5”分错了，根据D2可知它们的权值为0.0715, 0.0715,  0.0715，所以G2(x)在训练数据集上的误差率e2=P(G2(xi)≠yi) = 0.0715 * 3 = 0.2143。计算G2的系数：</div>
          <div className="content-row"><img src="/images/2827.png"/></div>
          <div className="content-row">更新训练数据的权值分布：</div>
          <div className="content-row"><img src="/images/2828.png"/></div>
          <div className="content-row">D3 = (0.0455, 0.0455, 0.0455, 0.1667, 0.1667,  0.01667, 0.1060, 0.1060, 0.1060, 0.0455)。被分错的样本“3 4 5”的权值变大，其它被分对的样本的权值变小。f2(x)=0.4236G1(x) + 0.6496G2(x)</div>
          <div className="content-row">此时，得到的第二个基本分类器sign(f2(x))在训练数据集上有3个误分类点（即3 4 5）。</div>
          <div className="content-row">迭代过程3</div>
          <div className="content-row">对于m=3，在权值分布为D3 = (0.0455, 0.0455, 0.0455, 0.1667, 0.1667,  0.01667, 0.1060, 0.1060, 0.1060, 0.0455)的训练数据上，经过计算可得：</div>
          <div className="content-row">阈值v取2.5时误差率为0.1060*3（x  &lt; 2.5时取1，x > 2.5时取-1，则6 7 8分错，误差率为0.1060*3），
            阈值v取5.5时误差率最低为0.0455*4（x > 5.5时取1，x  &lt; 5.5时取-1，则0 1 2 9分错，误差率为0.0455*3 + 0.0715），
            阈值v取8.5时误差率为0.1667*3（x  &lt; 8.5时取1，x > 8.5时取-1，则3 4 5分错，误差率为0.1667*3）。
            所以阈值v取5.5时误差率最低，故第三个基本分类器为：
          </div>
          <div className="content-row"><img src="/images/2828.png"/></div>
          <div className="content-row">依然还是原样本：</div>
          <div className="content-row"><img src="/images/28210.png"/></div>
          <div className="content-row">此时，被误分类的样本是：0 1 2 9，这4个样本所对应的权值皆为0.0455，所以G3(x)在训练数据集上的误差率e3= P(G3(xi)≠yi) = 0.0455*4 = 0.1820。计算G3的系数：</div>
          <div className="content-row"><img src="/images/28211.png"/></div>
          <div className="content-row">更新训练数据的权值分布：</div>
          <div className="content-row"><img src="/images/28212.png"/></div>
          <div className="content-row">D4 = (0.125, 0.125, 0.125, 0.102, 0.102,  0.102, 0.065, 0.065, 0.065, 0.125)。被分错的样本“0 1 2 9”的权值变大，其它被分对的样本的权值变小。f3(x)=0.4236G1(x) + 0.6496G2(x)+0.7514G3(x)</div>
          <div className="content-row">此时，得到的第三个基本分类器sign(f3(x))在训练数据集上有0个误分类点。至此，整个训练过程结束。</div>
          <div className="content-row">现在，咱们来总结下3轮迭代下来，各个样本权值和误差率的变化，如下所示（其中，样本权值D中加了下划线的表示在上一轮中被分错的样本的新权值）：训练之前，各个样本的权值被初始化为D1 = (0.1, 0.1,0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1)；</div>
          <div className="content-row">第一轮迭代中，样本“6 7 8”被分错，对应的误差率为e1=P(G1(xi)≠yi) = 3*0.1 = 0.3，此第一个基本分类器在最终的分类器中所占的权重为a1 = 0.4236。第一轮迭代过后，样本新的权值为D2 = (0.0715, 0.0715, 0.0715, 0.0715, 0.0715,  0.0715, 0.1666, 0.1666, 0.1666, 0.0715)；</div>
          <div className="content-row">第二轮迭代中，样本“3 4 5”被分错，对应的误差率为e2=P(G2(xi)≠yi) = 0.0715 * 3 = 0.2143，此第二个基本分类器在最终的分类器中所占的权重为a2 = 0.6496。第二轮迭代过后，样本新的权值为D3 = (0.0455, 0.0455, 0.0455, 0.1667, 0.1667,  0.01667, 0.1060, 0.1060, 0.1060, 0.0455)；</div>
          <div className="content-row">第三轮迭代中，样本“0 1 2 9”被分错，对应的误差率为e3 = P(G3(xi)≠yi) = 0.0455*4 = 0.1820，此第三个基本分类器在最终的分类器中所占的权重为a3 = 0.7514。第三轮迭代过后，样本新的权值为D4 = (0.125, 0.125, 0.125, 0.102, 0.102,  0.102, 0.065, 0.065, 0.065, 0.125)。</div>
          <div className="content-row">从上述过程中可以发现，如果某些个样本被分错，它们在下一轮迭代中的权值将被增大，反之，其它被分对的样本在下一轮迭代中的权值将被减小。就这样，分错样本权值增大，分对样本权值变小，而在下一轮迭代中，总是选取让误差率最低的阈值来设计基本分类器，所以误差率e（所有被Gm(x)误分类样本的权值之和）不断降低。</div>
          <div className="content-row"> 综上，将上面计算得到的a1、a2、a3各值代入G(x)中，G(x) = sign[f3(x)] = sign[ a1 * G1(x) + a2 * G2(x) + a3 * G3(x) ]，得到最终的分类器为：G(x) = sign[f3(x)] = sign[ 0.4236G1(x) + 0.6496G2(x)+0.7514G3(x) ]。</div>
          <div className="content-row">我们再看看Adaboost的误差界。</div>
          <div className="content-row">通过上面的例子可知，Adaboost在学习的过程中不断减少训练误差e，直到各个弱分类器组合成最终分类器，那这个最终分类器的误差界到底是多少呢？事实上，Adaboost 最终分类器的训练误差的上界为：</div>
          <div className="content-row"><img src="/images/28213.png"/></div>
          <div className="content-row">下面，咱们来通过推导来证明下上述式子。</div>
          <div className="content-row">当G(xi)≠yi时，yi*f(xi)&lt; 0，因而exp(-yi*f(xi))≥1，因此前半部分得证。关于后半部分，别忘了：</div>
          <div className="content-row"><img src="/images/28214.png"/></div>
          <div className="content-row">整个的推导过程如下：</div>
          <div className="content-row"><img src="/images/28215.png"/></div>
          <div className="content-row">这个结果说明，可以在每一轮选取适当的Gm使得Zm最小，从而使训练误差下降最快。接着，咱们来继续求上述结果的上界。对于二分类而言，有如下结果：</div>
          <div className="content-row"><img src="/images/28216.png"/></div>
          <div className="content-row">其中，<img src="/images/28217.png"/></div>
          <div className="content-row">继续证明下这个结论。由之前Zm的定义式跟本节最开始得到的结论可知：</div>
          <div className="content-row"><img src="/images/28218.png"/></div>
          <div className="content-row">而这个不等式<img src="/images/28219.png"/>可先由e^x和1-x的开根号，在点x的泰勒展开式推出。</div>
          <div className="content-row">值得一提的是，如果取γ1, γ2… 的最小值，记做γ（显然，γ≥γi>0，i=1,2,...m），则对于所有m，有：</div>
          <div className="content-row"><img src="/images/28220.png"/></div>
          <div className="content-row">这个结论表明，AdaBoost的训练误差是以指数速率下降的。另外，AdaBoost算法不需要事先知道下界γ，AdaBoost具有自适应性，它能适应弱分类器各自的训练误差率。</div>
          <div className="content-row">最后，Adaboost 还有另外一种理解，即可以认为其模型是加法模型、损失函数为指数函数、学习算法为前向分步算法的二类分类学习方法，下个月即12月份会再推导下，然后更新此文。而在此之前，有兴趣的可以参看《统计学习方法》第8.3节或其它相关资料。</div>
          <div className="content-row">3 Adaboost 指数损失函数推导</div>
          <div className="content-row">事实上，在上文Adaboost的算法流程的步骤3中，我们构造的各个基本分类器的线性组合</div>
          <div className="content-row"><img src="/images/28221.png"/></div>
          <div className="content-row">是一个加法模型，而Adaboost算法其实是前向分步算法的特例。那么问题来了，什么是加法模型，什么又是前向分步算法呢？</div>
          <div className="content-row">3.1 加法模型和前向分步算法</div>
          <div className="content-row">如下图所示的便是一个加法模型</div>
          <div className="content-row"><img src="/images/28222.png"/></div>
          <div className="content-row">其中，<img src="/images/28223.png"/>称为基函数，<img src="/images/28224.png"/>称为基函数的参数，<img src="/images/28225.png"/>称为基函数的系数。</div>
          <div className="content-row">在给定训练数据及损失函数<img src="/images/28226.png"/>的条件下，学习加法模型<img src="/images/28227.png"/>成为经验风险极小化问题，即损失函数极小化问题：</div>
          <div className="content-row"><img src="/images/28228.png"/></div>
          <div className="content-row"> 随后，该问题可以作如此简化：从前向后，每一步只学习一个基函数及其系数，逐步逼近上式，即：每步只优化如下损失函数：</div>
          <div className="content-row"><img src="/images/28229.png"/></div>
          <div className="content-row">这个优化方法便就是所谓的前向分步算法。</div>
          <div className="content-row">下面，咱们来具体看下前向分步算法的算法流程：</div>
          <div className="content-row">输入：训练数据集<img src="/images/28230.png"/></div>
          <div className="content-row">损失函数：<img src="/images/28231.png"/></div>
          <div className="content-row">基函数集：<img src="/images/28232.png"/></div>
          <div className="content-row">输出：加法模型<img src="/images/28233.png"/></div>
          <div className="content-row">算法步骤：</div>
          <div className="content-row">1. 初始化<img src="/images/28234.png"/></div>
          <div className="content-row">2. 对于m=1,2,..M</div>
          <div className="content-row">a)极小化损失函数</div>
          <div className="content-row"><img src="/images/28235.png"/></div>
          <div className="content-row">得到参数<img src="/images/28236.png"/>和<img src="/images/28237.png"/>。</div>
          <div className="content-row">b)更新</div>
          <div className="content-row"><img src="/images/28238.png"/></div>
          <div className="content-row">3.最终得到加法模型</div>
          <div className="content-row"><img src="/images/28239.png"/></div>
          <div className="content-row">就这样，前向分步算法将同时求解从m=1到M的所有参数（<img src="/images/28240.png"/>、<img src="/images/28241.png"/>）的优化问题简化为逐次求解各个<img src="/images/28242.png"/>、<img src="/images/28243.png"/>（1≤m≤M）的优化问题。</div>
          <div className="content-row">3.2 前向分步算法与Adaboost的关系</div>
          <div className="content-row">在上文最后我们说Adaboost 还有另外一种理解，即可以认为其模型是加法模型、损失函数为指数函数、学习算法为前向分步算法的二类分类学习方法。其实，Adaboost算法就是前向分步算法的一个特例，Adaboost 中，各个基本分类器就相当于加法模型中的基函数，且其损失函数为指数函数。</div>
          <div className="content-row">换句话说，当前向分步算法中的基函数为Adaboost中的基本分类器时，加法模型等价于Adaboost的最终分类器</div>
          <div className="content-row"><img src="/images/28244.png"/></div>
          <div className="content-row">你甚至可以说，这个最终分类器其实就是一个加法模型。只是这个加法模型由基本分类器<img src="/images/28245.png"/>及其系数<img src="/images/28246.png"/>组成，m = 1, 2, ..., M。前向分步算法逐一学习基函数的过程，与Adaboost算法逐一学习各个基本分类器的过程一致。</div>
          <div className="content-row">下面，咱们便来证明：当前向分步算法的损失函数是指数损失函数</div>
          <div className="content-row"><img src="/images/28247.png"/></div>
          <div className="content-row">时，其学习的具体操作等价于Adaboost算法的学习过程。</div>
          <div className="content-row">假设经过m-1轮迭代，前向分步算法已经得到<img src="/images/28248.png"/></div>
          <div className="content-row"><img src="/images/28249.png"/></div>
          <div className="content-row">而后在第m轮迭代得到<img src="/images/28250.png"/>、<img src="/images/28251.png"/>和<img src="/images/28252.png"/>。其中，<img src="/images/28253.png"/>为：</div>
          <div className="content-row"><img src="/images/28254.png"/></div>
          <div className="content-row">而<img src="/images/28255.png"/>和<img src="/images/28256.png"/>未知。所以，现在咱们的目标便是根据前向分步算法训练<img src="/images/28257.png"/>和<img src="/images/28258.png"/>，使得最终<img src="/images/28259.png"/>在训练数据集T上的指数损失最小，即</div>
          <div className="content-row"><img src="/images/28260.png"/></div>
          <div className="content-row">针对这种需要求解多个参数的情况，可以先固定其它参数，求解其中一两个参数，然后逐一求解剩下的参数。例如我们可以固定<img src="/images/28261.png"/>和<img src="/images/28262.png"/>，只针对<img src="/images/28263.png"/>和<img src="/images/28264.png"/>做优化。</div>
          <div className="content-row">换言之，在面对<img src="/images/28265.png"/>和<img src="/images/28266.png"/>这2m个参数都未知的情况下，可以：</div>
          <div className="content-row">先假定<img src="/images/28267.png"/>和<img src="/images/28268.png"/>已知，求解出<img src="/images/28269.png"/>和<img src="/images/28270.png"/>；然后再逐一求解其它未知参数。</div>
          <div className="content-row">且考虑到上式中的<img src="/images/28271.png"/>既不依赖a也不依赖G，所以是个与最小化无关的固定值，记为<img src="/images/28272.png"/>，即<img src="/images/28273.png"/>，则上式可以表示为（后面要多次用到这个式子，简记为 ）：<img src="/images/28274.png"/></div>
          <div className="content-row"><img src="/images/28275.png"/></div>
          <div className="content-row">值得一提的是，<img src="/images/28276.png"/>虽然与最小化无关，但<img src="/images/28277.png"/>依赖于<img src="/images/28278.png"/>，随着每一轮迭代而发生变化。</div>
          <div className="content-row">接下来，便是要证使得上式达到最小的<img src="/images/28279.png"/>和<img src="/images/28280.png"/>就是Adaboost算法所求解得到的<img src="/images/28281.png"/>和<img src="/images/28282.png"/>。</div>
          <div className="content-row">为求解上式，咱们先求<img src="/images/28283.png"/>再求<img src="/images/28284.png"/>。</div>
          <div className="content-row"> 首先求<img src="/images/28285.png"/>。对于任意<img src="/images/28286.png"/>，使上式<img src="/images/28287.png"/>最小的G(x)由下式得到：</div>
          <div className="content-row"><img src="/images/28288.png"/></div>
          <div className="content-row">别忘了，<img src="/images/28289.png"/>。</div>
          <div className="content-row">跟1.2节所述的误差率的计算公式对比下：</div>
          <div className="content-row"><img src="/images/28290.png"/></div>
          <div className="content-row">可知，上面得到的<img src="/images/28291.png"/>便是Adaboost算法的基本分类器<img src="/images/28292.png"/>，因为它是在第m轮加权训练数据时，使分类误差率最小的基本分类器。换言之，这个<img src="/images/28293.png"/>便是Adaboost算法所要求的<img src="/images/28294.png"/>，别忘了，在Adaboost算法的每一轮迭代中，都是选取让误差率最低的阈值来设计基本分类器。</div>
          <div className="content-row">然后求<img src="/images/28295.png"/>。还是回到之前的这个式子<img src="/images/28296.png"/>上：</div>
          <div className="content-row"><img src="/images/28297.png"/></div>
          <div className="content-row">这个式子的后半部分可以进一步化简，得：</div>
          <div className="content-row"><img src="/images/28298.png"/></div>
          <div className="content-row">接着将上面求得的<img src="/images/28299.png"/></div>
          <div className="content-row"><img src="/images/282100.png"/></div>
          <div className="content-row">代入上式中，且对a求导，令其求导结果为0，即得到使得<img src="/images/282101.png"/>一式最小的 ，即为：</div>
          <div className="content-row"><img src="/images/282102.png"/></div>
          <div className="content-row">这里的<img src="/images/282103.png"/>跟上文1.2节中<img src="/images/282104.png"/>的计算公式完全一致。</div>
          <div className="content-row">此外，毫无疑问，上式中的<img src="/images/282105.png"/>便是误差率：</div>
          <div className="content-row"><img src="/images/282106.png"/></div>
          <div className="content-row"> 即<img src="/images/282105.png"/>就是被Gm(x)误分类样本的权值之和。</div>
          <div className="content-row">就这样，结合模型<img src="/images/282107.png"/>，跟<img src="/images/282108.png"/>，可以推出<img src="/images/282109.png"/></div>
          <div className="content-row"> 从而有：<img src="/images/282110.png"/>与上文介绍的权值更新公式：<img src="/images/282111.png"/>相比，只相差一个规范化因子，即后者多了一个<img src="/images/282112.png"/></div>
          <div className="content-row">所以，整个过程下来，我们可以看到，前向分步算法逐一学习基函数的过程，确实是与Adaboost算法逐一学习各个基本分类器的过程一致，两者完全等价。</div>
        </div>

        <div className="target-fix" id='29'>
          <h2 className="title-one">网络神经</h2>
          <h4 className="title-two">浅层示例</h4>
          <div className="content-row">Neural Networks 适合一个input可能落入至少两个类别里。NN由若干层神经元，和它们之间的联系组成。第一层是input层，最后一层是output层。在hidden层和output层都有自己的classifier</div>
          <div className="content-row"><img src="/images/2911.png"/></div>
          <div className="content-row">input 输入到网络中，被激活，计算的分数被传递到下一层，激活后面的神经层，最后output 层的节点上的分数代表属于各类的分数，下图例子得到分类结果为class 1。同样的input被传输到不同的节点上，之所以会得到不同的结果是因为各自节点有不同的weights和bias。这也就是forward propagation</div>
          <div className="content-row"><img src="/images/2912.png"/></div>
          <h4 className="title-two">算法讲解</h4>
          <div className="content-row">机器学习中，神经网络算法可以说是当下使用的最广泛的算法。神经网络的结构模仿自生物神经网络，生物神经网络中的每个神经元与其他神经元相连，当它“兴奋”时，想下一级相连的神经元发送化学物质，改变这些神经元的电位；如果某神经元的电位超过一个阈值，则被激活，否则不被激活。误差逆传播算法是神经网络中最有代表性的算法，也是使用最多的算法之一。</div>
          <div className="content-row">误差逆传播算法理论推导</div>
          <div className="content-row">误差逆传播算法简称BP网络算法。而一般在说BP网络算法时，默认指用BP算法训练的多层前馈神经网络。</div>
          <div className="content-row">下面是一个简单的BP神经网络示意图。其拥有一个输入层，一个隐含层，一个输出层。推导中采用这种简单的三层的神经网络。</div>
          <div className="content-row"><img src="/images/2921.png"/></div>
          <div className="content-row">定义相关的一些变量如下：</div>
          <div className="content-row">1.假设有d个输入神经元，有l个输出神经元q个隐含层神经元；</div>
          <div className="content-row">2.设输出层第j个神经元的阈值为θj；</div>
          <div className="content-row">3.设隐含层第h个神经元的阈值为γh；</div>
          <div className="content-row">4.输入层第i个神经元与隐含层第h个神经元之间的连接权为Vih；</div>
          <div className="content-row">5.隐含层第h个神经元与输出层第j个神经元之间的连接权为Whj ；</div>
          <div className="content-row">6.记隐含层第h个神经元接收到来自于输入层的输入为αh：</div>
          <div className="content-row"><img src="/images/2922.png"/></div>
          <div className="content-row">7.记输出层第j个神经元接收到来自于隐含层的输入为βj</div>
          <div className="content-row"><img src="/images/2923.png"/></div>
          <div className="content-row">其中bh为隐含层第h个神经元的输出</div>
          <div className="content-row">理论推导：</div>
          <div className="content-row">在神经网络中，神经元接收到来自来自其他神经元的输入信号，这些信号乘以权重累加到神经元接收的总输入值上，随后与当前神经元的阈值进行比较，然后通过激活函数处理，产生神经元的输出。</div>
          <div className="content-row">激活函数：</div>
          <div className="content-row">理想的激活函数是阶跃函数，“0”对应神经元抑制，“1”对应神经元兴奋。然而阶跃函数的缺点是不连续，不可导，且不光滑，所以常用sigmoid函数作为激活函数代替阶跃函数。如下图分别是阶跃函数和sigmoid函数。</div>
          <div className="content-row">阶跃函数：</div>
          <div className="content-row"><img src="/images/2924.png"/><img src="/images/2925.png"/></div>
          <div className="content-row">sigmoid函数：</div>
          <div className="content-row"><img src="/images/2926.png"/><img src="/images/2927.png"/></div>
          <div className="content-row">对于一个训练例（xk, yk），假设神经网络的输出为 Yk ，则输出可表示为：<img src="/images/2928_.png"/></div>
          <div className="content-row">f(***)表示激活函数，默认全部的激活函数都为sigmoid函数。则可以计算网络上，（xk, yk）的均方差误差为：</div>
          <div className="content-row"><img src="/images/2928.png"/></div>
          <div className="content-row">乘以1/2是为了求导时能正好抵消掉常数系数。</div>
          <div className="content-row">现在，从隐含层的第h个神经元看，输入层总共有d个权重传递参数传给他，它又总共有l个权重传递参数传给输出层, 自身还有 1 个阈值。所以在我们这个神经网络中，一个隐含层神经元有（d+l+1）个参数待确定。输出层每个神经元还有一个阈值，所以总共有l个阈值。最后，总共有（d+l+1）*q+l 个待定参数。</div>
          <div className="content-row">首先，随机给出这些待定的参数，后面通过BP算法的迭代，这些参数的值会逐渐收敛于合适的值，那时，神经网络也就训练完成了。</div>
          <div className="content-row">任意权重参数的更新公式为：</div>
          <div className="content-row"><img src="/images/2929.png"/></div>
          <div className="content-row">下面以隐含层到输出层的权重参数 whj 为例说明：</div>
          <div className="content-row">我们可以按照前面给出的公式求出均方差误差Ek，期望其为0，或者为最小值。而BP算法基于梯度下降法（gradient descent）来求解最优解，以目标的负梯度方向对参数进行调整，通过多次迭代，新的权重参数会逐渐趋近于最优解。对于误差Ek，给定学习率（learning rate）即步长η，有：</div>
          <div className="content-row"><img src="/images/29210.png"/></div>
          <div className="content-row">再看一下参数的传递方向，首先 whj 影响到了输出层神经元的输入值 βj ，然后影响到输出值 Yjk ,然后再影响到误差 Ek ，所以可以列出如下关系式：</div>
          <div className="content-row"><img src="/images/29211.png"/></div>
          <div className="content-row">根据输出层神经元的输入值βj的定义：</div>
          <div className="content-row"><img src="/images/29212.png"/></div>
          <div className="content-row">得到：</div>
          <div className="content-row"><img src="/images/29213.png"/></div>
          <div className="content-row">对于激活函数（sigmoid函数）：</div>
          <div className="content-row"><img src="/images/29214.png"/></div>
          <div className="content-row">很容易通过求导证得下面的性质：</div>
          <div className="content-row"><img src="/images/29215.png"/></div>
          <div className="content-row">使用这个性质进行如下推导：</div>
          <div className="content-row">令：</div>
          <div className="content-row"><img src="/images/29216.png"/></div>
          <div className="content-row">又由于：</div>
          <div className="content-row"><img src="/images/29217.png"/></div>
          <div className="content-row">所以：</div>
          <div className="content-row"><img src="/images/29218.png"/></div>
          <div className="content-row">由前面的定义有：</div>
          <div className="content-row"><img src="/images/29219.png"/></div>
          <div className="content-row">所以：</div>
          <div className="content-row"><img src="/images/29220.png"/></div>
          <div className="content-row">把这个结果结合前面的几个式子代入：</div>
          <div className="content-row"><img src="/images/29221.png"/></div>
          <div className="content-row"><img src="/images/29222.png"/></div>
          <div className="content-row"><img src="/images/29223.png"/></div>
          <div className="content-row">得到：</div>
          <div className="content-row"><img src="/images/29224.png"/></div>
          <div className="content-row">所以：</div>
          <div className="content-row"><img src="/images/29224_.png"/></div>
          <div className="content-row">OK，上面这个式子就是梯度了。通过不停地更新即梯度下降法就可实现权重更新了。</div>
          <div className="content-row"><img src="/images/29225.png"/></div>
          <div className="content-row">推导到这里就结束了，再来解释一下式子中各个元素的意义。</div>
          <div className="content-row"><img src="/images/29226.png"/></div>
          <div className="content-row">η 为学习率，即梯度下降的补偿；<img src="/images/29227.png"/>为神经网络输出层第 j 个神经元的输出值；<img src="/images/29228.png"/>为给出的训练例（xk, yk）的标志（label），即训练集给出的正确输出；<img src="/images/29229.png"/>为隐含层第h个神经元的输出。</div>
          <div className="content-row">类似可得：</div>
          <div className="content-row"><img src="/images/29230.png"/></div>
          <div className="content-row">其中，</div>
          <div className="content-row"><img src="/images/29231.png"/></div>
          <div className="content-row">这部分的解法与前面的推导方法类似，不做赘述。</div>
        </div>
      </div>
    );
  }
}

ContentTwo.propTypes = {

}


export default ContentTwo

