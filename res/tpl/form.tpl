<div>
    <ul id="router"></ul>
</div>
<form>
    <fieldset id="form_module">
        <legend>基本属性</legend>
        内容所属模块:<select name="module_type">
            <option>模型结构模块</option>
            <option>优化器模块</option>
            <option>损失函数模块</option>
          </select>
          <div id="form_basic_info">
            作者:<input type="text" name="author">
            发布时间:<input type="date" name="time">
            标题:<input type="text" name="title">
          </div>
    </fieldset>
    
    <fieldset id="algorithm_describe" class="flex-d flex-col">
        <legend>算法描述</legend>
        <div class="insert_block">
            <select>
                <option>文本</option>
                <option>代码</option>
                <option>图片</option>
            </select>
            <button type="button">新增</button>
        </div>
    </fieldset>

    <fieldset id="mathematical_principles" class="flex-d flex-col">
        <legend>数学原理</legend>
        <div class="insert_block">
            <select>
                <option>文本</option>
                <option>公式</option>
                <option>图片</option>
            </select>
            <button type="button">新增</button>
        </div>
    </fieldset>

    <fieldset id="code_implement" class="flex-d flex-col">
        <legend>代码实现</legend>
        <div class="insert_block">
            <select>
                <option>文本</option>
                <option>代码</option>
                <option>图片</option>
            </select>
            <button type="button">新增</button>
        </div>
    </fieldset>

    <fieldset id="experimental_performance" class="flex-d flex-col">
        <legend>实验表现</legend>
        <div class="insert_block">
            <select>
                <option>文本</option>
                <option>图片</option>
                <option>表格</option>
            </select>
            <button type="button">新增</button>
        </div>
    </fieldset>

    <fieldset id="others" class="flex-d flex-col">
        <legend>杂项</legend>
        <div class="insert_block">
            <select>
                <option>文本</option>
                <option>代码</option>
                <option>公式</option>
                <option>图片</option>
                <option>表格</option>
            </select>
            <button type="button">新增</button>
        </div>
    </fieldset>
    <input type="submit">
</form>